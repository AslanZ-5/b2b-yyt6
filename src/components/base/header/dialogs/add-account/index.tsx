import { FC, useEffect, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Button from "components/ui/Button";
import Input from "components/ui/Input";
import PageProgress from "components/ui/PageProgress";

import { useCRUDRequest } from "hooks/useRequest";
import { login, getOtp } from "api/user";
import { useAppDispatch } from "store";
import { fetchUser, setLoading } from "store/slices/user";

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
  showOtpDialog: (open: boolean) => void;
  formValues: any;
}

const AddAccountDialog: FC<IProps> = ({
  open,
  setOpen,
  showOtpDialog,
  formValues,
}) => {
  const { values, handleInputValue, errors, formIsValid, clearField } = formValues;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    data: addAccountResponse,
    loading: addAccountLoading,
    errors: addAccountErrors,
    callback: addAccountCallback,
    clear: clearLoginResponse,
  } = useCRUDRequest<IAddAccountResponse>({ api: login });
  const {
    loading: otpLoading,
    callback: otpCallback,
    errors: otpErrors,
    data: otpResponse,
    clear: clearOtpResponse,
  } = useCRUDRequest({
    api: getOtp,
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleOtp = async () => {
    if (values.login.replace(/ /g, "").length === 10) {
      await otpCallback({ login: values.login.replace(/ /g, "") });
    }
  };

  useEffect(() => {
    if (otpResponse) {
      setOpen(false);
      showOtpDialog(true);
    }
  }, [otpResponse, setOpen, showOtpDialog]);

  useEffect(() => {
    if (open) {
      clearLoginResponse();
      clearOtpResponse();
    }
  }, [clearLoginResponse, clearOtpResponse, open]);

  const disableButton = () => {
    return Boolean(!formIsValid() || !values.login || !values.password);
  };

  return (
    <Dialog
      classes={{ root: classes.root }}
      open={open}
      keepMounted
      onClose={() => setOpen(false)}
    >
      <Grid container justify="flex-end" alignItems="center">
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Grid>
      {addAccountLoading || otpLoading ? (
        <PageProgress />
      ) : (
        <Grid container direction="column">
          <div className={classes.title}>Добавление номера</div>
          <div className={classes.description}>
            Пожалуйста, введите номер мобильного телефона
          </div>
          <Box width="100%" mb="20px">
            <Input
              name="login"
              value={values.login}
              setValue={handleInputValue}
              {...(errors?.login
                ? { error: true, helperText: errors.login }
                : { error: false, helperText: "" })}
              mask={[
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
              ]}
              startAdornment={
                <div className={classes.inputStartAddornment}>+7</div>
              }
              endAdornment={
                  <IconButton className={classes.clearButton} onClick={() => clearField('login')}>
                    <CloseIcon />
                  </IconButton>
              }
            />
          </Box>
          <Input
            name="password"
            value={values.password}
            setValue={handleInputValue}
            type={showPassword ? "text" : "password"}
            {...(errors?.password
              ? { error: true, helperText: errors.password }
              : { error: false, helperText: "" })}
            placeholder="Пароль"
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
          <Box width="100%" mt="30px" mb="12px" textAlign="center">
            {addAccountErrors?.message ? (
              <div className={classes.requestErrors}>
                {addAccountErrors?.message}
              </div>
            ) : null}
            {otpErrors?.message && !otpResponse ? (
              <div className={classes.requestErrors}>
                Номер не является клиентом +7Телеком
              </div>
            ) : null}
            <Button
              text="Войти"
              onClick={() =>
                addAccountCallback({
                  login: values.login.replace(/ /g, ""),
                  password: values.password,
                  type: "password",
                })
              }
              additionalClasses={{
                width: "217px",
              }}
              disabled={disableButton()}
            />
          </Box>
          <div className={classes.loginBySms} onClick={handleOtp}>
            Войти по SMS
          </div>
        </Grid>
      )}
    </Dialog>
  );
};

export default AddAccountDialog;
