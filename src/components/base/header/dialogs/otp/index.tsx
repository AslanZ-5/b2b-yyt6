import { FC, useEffect, useRef, useState, useCallback } from "react";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Button from "components/ui/Button";
import Input from "components/ui/Input";
import PageProgress from "components/ui/PageProgress";

import { useForm } from "hooks/useForm";
import { useCRUDRequest } from "hooks/useRequest";
import { login as loginRequest } from "api/user";
import { useAppDispatch } from "store";
import { fetchUser, setLoading } from "store/slices/user";
import { baseColors } from "constants/colors";

import { useStyles } from "./styles";

interface IAddAccountResponse {
  token: string;
  expire: string;
  typeEntity: boolean;
  full_name: string;
  refreshToken: string;
}

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  showAddAccountDialog: (open: boolean) => void;
  login: string;
}

const OtpDialog: FC<IProps> = ({
  open,
  setOpen,
  showAddAccountDialog,
  login,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { values, handleInputValue, errors, clearFields } = useForm({
    initialValues: { password: "" },
    rules: {
      password: { required: true },
    },
  });
  const {
    data: addAccountResponse,
    loading: addAccountLoading,
    errors: addAccountErrors,
    callback: addAccountCallback,
    clear: clearOtpResponse,
  } = useCRUDRequest<IAddAccountResponse>({ api: loginRequest });
  const [showPassword, setShowPassword] = useState(false);

  // Отправить otp и установить таймер

  let timer = useRef<any>(null);
  const [timerSeconds, setTimerSeconds] = useState(60);

  const startTimer = useCallback(async () => {
    timer.current = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  const clearTimer = useCallback(() => {
    clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (open) startTimer();
    return clearTimer;
  }, [clearTimer, open, startTimer]);

  // Добавление аккаунта

  useEffect(() => {
    if (!addAccountErrors?.message && addAccountResponse) {
      dispatch(setLoading(true));
      dispatch(
        fetchUser(
          addAccountResponse?.token || "",
          addAccountResponse?.refreshToken || ""
        )
      );
      setOpen(false);
    }
  }, [addAccountResponse, addAccountErrors?.message, dispatch, setOpen]);

  // Переотправить код

  const resendOtp = async () => {
    clearTimer();
    setTimerSeconds(60);
    startTimer();
  };

  // Очистить поля при переоткрытии диалога

  useEffect(() => {
    if (open) {
      clearFields();
      clearOtpResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog
      classes={{ root: classes.root }}
      open={open}
      keepMounted
      onClose={() => {
        setOpen(false);
      }}
    >
      <Grid container justify="flex-end" alignItems="center">
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Grid>
      {addAccountLoading ? (
        <PageProgress />
      ) : (
        <Grid container direction="column">
          <div className={classes.title}>Введите код из SMS</div>
          <div className={classes.description}>Код был отправлен на номер</div>
          <div className={classes.phone}>{login || ""}</div>
          <Input
            name="password"
            value={values.password}
            setValue={handleInputValue}
            type={showPassword ? "text" : "password"}
            {...(errors?.password
              ? { error: true, helperText: errors.password }
              : { error: false, helperText: "" })}
            placeholder="Код из SMS"
            buttonHandler={() =>
              addAccountCallback({
                password: values.password,
                login: login.replace(/ /g, ""),
                type: "otp",
              })
            }
            endAdornment={
              <div className={classes.passwordInputImg}>
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  src={`/images/icons/eye-${
                    showPassword ? "show" : "hide"
                  }.svg`}
                  alt=""
                />
              </div>
            }
          />
          <Box width="100%" mt="20px" textAlign="center">
            {addAccountErrors?.message ? (
              <div className={classes.requestErrors}>
                {addAccountErrors?.message}
              </div>
            ) : null}
            <div className={classes.timer}>
              {timerSeconds === 0 ? (
                <span onClick={resendOtp}>Отправить код еще раз</span>
              ) : (
                `Отправить код еще раз через ${timerSeconds} сек`
              )}
            </div>
            <Box width="100%" mb="20px">
              <Button
                text="Войти"
                onClick={() => addAccountCallback({
                  password: values.password,
                  login: login.replace(/ /g, ""),
                  type: "otp",
                })}
                additionalClasses={{
                  width: "217px",
                  backgroundColor: baseColors.primaryBlue,
                  color: baseColors.lightBlue,
                }}
                disabled={!values.password.length}
              />
            </Box>
            <Button
              text="Войти с другим номером"
              onClick={() => {
                setOpen(false);
                showAddAccountDialog(true);
              }}
              additionalClasses={{
                width: "217px",
                backgroundColor: baseColors.lightBlue,
                color: baseColors.primaryBlue,
              }}
            />
          </Box>
        </Grid>
      )}
    </Dialog>
  );
};

export default OtpDialog;
