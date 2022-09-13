import { FC, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import PageProgress from "components/ui/PageProgress";
import { Typography } from "@material-ui/core";
import { useCRUDRequest } from "hooks/useRequest";
import { login, getOtp } from "api/user";
import { useAppDispatch } from "store";
import { fetchUser, setLoading } from "store/slices/user";
import {
  additionalClassNameButton,
  additionalClassNameSmsButton,
  phoneMask,
  useStyles,
} from "./styles";
import useForm from "hooks/useForm";
import { routes } from "constants/routes";
import { useHistory } from "react-router-dom";
import OtpForm from "./otp";
import { baseColors } from "constants/colors";

interface IloginAccountResponse {
  token: string;
  expire: string;
  typeEntity: boolean;
  full_name: string;
  refreshToken: string;
}

export const processedPhoneNumber = (value: string) => {
  //Удаление маски перед валидацией номера телефона
  return value.replace(/[^\d]/g, "");
};
const LoginAccount: FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    values,
    handleInputValue,
    errors,
    formIsValid,
    clearFields,
    clearField,
  } = useForm({
    initialValues: { login: "", password: "" },
    rules: {
      login: {
        required: true,
        pattern: /^([0-9]{3})([0-9]{3})([0-9]{2})([0-9]{2})+$/,
        processedPatternMask: processedPhoneNumber,
      },
      password: { required: true, pattern: /^[a-zA-Z0-9@*#]{8,15}$/ },
    },
  });
  const {
    data: loginAccountResponse,
    loading: loginAccountLoading,
    errors: loginAccountErrors,
    callback: loginAccountCallback,
    clear: clearLoginResponse,
  } = useCRUDRequest<IloginAccountResponse>({ api: login });
  const {
    loading: otpLoading,
    callback: otpCallback,
    errors: otpErrors,
    data: otpResponse,
    clear: clearOtpResponse,
  } = useCRUDRequest({
    api: getOtp,
  });

  const handleOtp = async () => {
    const value = processedPhoneNumber(values.login);
    if (value.length === 10) {
      await otpCallback({ login: value });
    }
  };

  const handleLogin = async () => {
    await loginAccountCallback({
      login: processedPhoneNumber(values.login),
      password: values.password,
      type: "password",
    });
    clearFields();
    history.push(routes.personal.base);
  };

  const disableButton = () => {
    return Boolean(!formIsValid() || !values.login || !values.password);
  };

  useEffect(() => {
    if (!loginAccountErrors?.message && loginAccountResponse) {
      dispatch(setLoading(true));
      dispatch(
        fetchUser(
          loginAccountResponse?.token || "",
          loginAccountResponse?.refreshToken || ""
        )
      );
    }
  }, [loginAccountResponse, loginAccountErrors?.message, dispatch]);

  useEffect(() => {
    if (open) {
      clearLoginResponse();
      clearOtpResponse();
    }
  }, [clearLoginResponse, clearOtpResponse, open]);

  return (
    <>
      {loginAccountLoading || otpLoading ? (
        <PageProgress style={classes.progressBar} />
      ) : (
        <Grid container>
          {open && !otpErrors?.message ? (
            <Grid>
              <OtpForm
                sendSms={handleOtp}
                open={open}
                setOpen={(open) => {
                  setOpen(open);
                }}
                showLoginAccount={(open) => setOpen(open)}
                login={values.login}
              />
            </Grid>
          ) : (
            <>
              <div className={classes.description}>Вход в личный кабинет</div>
              <Box width="100%" mb="20px">
                <Typography
                  style={{ display: "flex", alignSelf: "start" }}
                  className={classes.inputDescription}
                >
                  Номер телефона
                </Typography>
                <Input
                  name="login"
                  value={values.login}
                  setValue={handleInputValue}
                  {...(errors?.login
                    ? { error: true, helperText: errors.login }
                    : { error: false, helperText: "" })}
                  mask={phoneMask}
                  startAdornment={
                    <div className={classes.inputStartAddornment}>+7</div>
                  }
                  endAdornment={
                    <IconButton
                      className={classes.clearButton}
                      onClick={() => clearField("login")}
                    >
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
                {loginAccountErrors?.message ? (
                  <div className={classes.requestErrors}>
                    {loginAccountErrors?.message}
                  </div>
                ) : null}
                {otpErrors?.message && !otpResponse ? (
                  <div className={classes.requestErrors}>
                    Номер не является клиентом +7 Телеком
                  </div>
                ) : null}
                <Button
                  style={additionalClassNameButton}
                  text="Войти"
                  onClick={handleLogin}
                  disabled={disableButton()}
                />
              </Box>
              <Button
                style={additionalClassNameSmsButton}
                text="ВОЙТИ ЧЕРЕЗ SMS →"
                onClick={() => {
                  handleOtp();
                  setOpen(true);
                }}
                additionalClasses={{
                  width: "217px",
                  backgroundColor: "transparent",
                  color: baseColors.brandBlue,
                }}
                disabled={values.login.length < 10}
              />
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default LoginAccount;
