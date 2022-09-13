import { FC, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "components/ui/Button";
import PageProgress from "components/ui/PageProgress";
import { useCRUDRequest } from "hooks/useRequest";
import { login as loginRequest } from "api/user";
import { useAppDispatch } from "store";
import { fetchUser, setLoading } from "store/slices/user";
import { baseColors } from "constants/colors";
import { useStyles } from "./styles";
import { additionalClassName, additionalClassNameSms } from "./styles";
import { processedPhoneNumber } from "..";
import { routes } from "constants/routes";
import { useHistory } from "react-router-dom";
import { Timer } from "./timer/intex";
import { CodeInput } from "./code-input";
import cn from "classnames";
import { Typography } from "@material-ui/core";

interface IloginAccountResponse {
  token: string;
  expire: string;
  typeEntity: boolean;
  full_name: string;
  refreshToken: string;
}

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  showLoginAccount: (open: boolean) => void;
  sendSms: () => Promise<void>;
  login: string;
}

const OtpForm: FC<IProps> = ({
  open,
  setOpen,
  showLoginAccount,
  sendSms,
  login,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [code, setCode] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const isValidCode = code.length === 6;

  const {
    data: loginAccountResponse,
    loading: loginAccountLoading,
    errors: loginAccountErrors,
    callback: loginAccountCallback,
    clear: clearOtpResponse,
  } = useCRUDRequest<IloginAccountResponse>({ api: loginRequest });

  useEffect(() => {
    if (!loginAccountErrors?.message && loginAccountResponse) {
      dispatch(setLoading(true));
      dispatch(
        fetchUser(
          loginAccountResponse?.token || "",
          loginAccountResponse?.refreshToken || ""
        )
      );
      setOpen(open);
    }
  }, [loginAccountResponse, loginAccountErrors?.message, dispatch, setOpen]);

  useEffect(() => {
    if (open) {
      clearOtpResponse();
    }
  }, [open]);

  const handleSendOtpCode = async () => {
    await loginAccountCallback({
      password: code,
      login: processedPhoneNumber(login),
      type: "otp",
    });
  };
  useEffect(() => {
    if (loginAccountResponse?.token) {
      history.push(routes.personal.base);
      setOpen(false);
    }
    return;
  }, [loginAccountResponse?.token]);
  const errorMessage = loginAccountErrors?.message;
  useEffect(() => {
    if (!!errorMessage) {
      setIsError(true);
    }
  }, [errorMessage]);

  return (
    <>
      {loginAccountLoading ? (
        <PageProgress />
      ) : (
        <Grid container justify="center">
          <Grid container style={{ width: "min-content", margin: "0 auto" }}>
            <div className={classes.title}>Вход в личный кабинет</div>
            <Typography
              style={{ display: "flex", alignSelf: "start" }}
              className={classes.inputDescription}
            >
              Введите код из SMS
            </Typography>
            <CodeInput
              className={cn(classes.input, {
                [classes.filledInputError]: isError,
                [classes.filledInput]: isValidCode && !isError,
              })}
              isError={isError}
              onChange={(code) => {
                setCode(code);
                if (isError) {
                  setIsError(false);
                }
              }}
            />
          </Grid>
          <Box width="100%" mt="20px" textAlign="center">
            {loginAccountErrors?.message ? (
              <div className={classes.requestErrors}>
                {loginAccountErrors?.message}
              </div>
            ) : null}
            <Timer sendSms={sendSms} open={open} />
            <Box width="100%" mb="20px">
              <Button
                style={additionalClassName}
                text="Войти"
                onClick={handleSendOtpCode}
                disabled={!isValidCode}
              />
            </Box>
            <Button
              style={additionalClassNameSms}
              text="Войти с другим номером"
              onClick={() => {
                setOpen(true);
                showLoginAccount(false);
              }}
              additionalClasses={{
                width: "217px",
                backgroundColor: "transparent",
                color: baseColors.brandBlue,
              }}
            />
          </Box>
        </Grid>
      )}
    </>
  );
};

export default OtpForm;
