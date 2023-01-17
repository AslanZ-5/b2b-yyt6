import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Sidebar from "components/base/sidebar";
import NavTabs from "components/base/nav-tabs";
import PageProgress from "components/ui/PageProgress";
import InfoDialog from "components/ui/InfoDialog";
import Personal from "pages/main/personal";
import Input from "components/ui/Input";
import { useCRUDRequest } from "hooks/useRequest";
import { routes } from "constants/routes";
import { useAppSelector } from "store";
import { setPassword as setPasswordRequest } from "api/settings";
import useForm from "hooks/useForm";
import { useStyles } from "./style";

const Expenses = lazy(() => import("./expenses"));
const Services = lazy(() => import("./services"));
const Numbers = lazy(() => import("./numbers"));
const Tariffs = lazy(() => import("./tariffs"));
const Settings = lazy(() => import("./settings"));
const Support = lazy(() => import("./support"));
const Balances = lazy(() => import("./balances"));
const AdminChangeTariff = lazy(
  () => import("./personal/components/admin/tariffs/change")
);
const AdminChangeService = lazy(
  () => import("./personal/components/admin/services/change")
);

const formData = {
  initialValues: {
    acceptPassword: "",
    newPassword: "",
  },
  rules: {
    acceptPassword: { required: true, pattern: /^[a-zA-Z0-9@*#]{8,15}$/ },
    newPassword: { required: true, pattern: /^[a-zA-Z0-9@*#]{8,15}$/ },
  },
  errorsMessages: {
    newPassword: {
      pattern: `Пароль должен содержать от 8 до 15 символов и\nсодержать символы латинского алфавита и/или цифры.`,
    },
    acceptPassword: {
      pattern: `Пароль должен содержать от 8 до 15 символов и\nсодержать символы латинского алфавита и/или цифры.`,
    },
  },
};

const Main: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAppSelector((state) => state.user);
  const { callback: changePassword } = useCRUDRequest<{ token: string }>({
    api: setPasswordRequest,
  });

  const { values, errors, handleInputValue, formIsValid } = useForm(formData);
  const [showPassword, setShowPassword] = useState(false);
  const [showAcceptPassword, setShowAcceptPassword] = useState(false);
  const [passwordsConfirm, setPasswordsConfirm] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  useEffect(() => {
    if (!user?.password_change_at) {
      setShowPasswordDialog(true);
    }
  }, [user?.password_change_at]);

  const setPassword = async () => {
    await changePassword({ password: values.newPassword });
    setShowPasswordDialog(false);
  };

  useEffect(() => {
    if (
      values.newPassword &&
      values.acceptPassword &&
      values.newPassword === values.acceptPassword
    )
      setPasswordsConfirm(true);
    else setPasswordsConfirm(false);
  }, [values.acceptPassword, values.newPassword]);

  const disableButton = !Boolean(
    values.acceptPassword &&
      values.newPassword &&
      formIsValid() &&
      passwordsConfirm
  );

  const newPasswordSvg =
    "/images/icons/eye-" + (showPassword ? "show" : "hide") + ".svg";

  const acceptPasswordSvg =
    "/images/icons/eye-" + (showAcceptPassword ? "show" : "hide") + ".svg";

  return (
    <>
      <InfoDialog
        type="createPassword"
        title={`Создание пароля для\n безопасности данных`}
        show={showPasswordDialog}
        handleClose={() => {
          setShowPasswordDialog(false);
          if (!user?.email) {
            setShowEmailDialog(true);
          }
        }}
        upButton={{
          text: "Сохранить",
          callback: setPassword,
          disabled: disableButton,
        }}
        downButton={{
          show: false,
        }}
      >
        <Box width="100%" mb="16px" pt="10px">
          <Input
            name="newPassword"
            value={values.newPassword}
            setValue={handleInputValue}
            type={showPassword ? "text" : "password"}
            {...(errors?.newPassword
              ? { error: true, helperText: errors.newPassword }
              : { error: false, helperText: "" })}
            placeholder="Введите пароль"
            endAdornment={
              <div className={classes.passwordInputImg}>
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  src={newPasswordSvg}
                  alt=""
                />
              </div>
            }
          />
        </Box>
        <Box width="100%">
          <Input
            name="acceptPassword"
            value={values.acceptPassword}
            setValue={handleInputValue}
            type={showAcceptPassword ? "text" : "password"}
            {...(errors?.acceptPassword
              ? { error: true, helperText: errors.acceptPassword }
              : { error: false, helperText: "" })}
            placeholder="Введите пароль еще раз"
            endAdornment={
              <div className={classes.passwordInputImg}>
                <img
                  onClick={() => setShowAcceptPassword(!showAcceptPassword)}
                  src={acceptPasswordSvg}
                  alt=""
                />
              </div>
            }
          />
          <Box width="100%" mt="10px">
            <div className={classes.error}>
              {values.newPassword &&
                values.acceptPassword &&
                !passwordsConfirm &&
                "Пароль должен совпадать с новым паролем."}
            </div>
          </Box>
        </Box>
      </InfoDialog>
      <InfoDialog
        type="noEmail"
        title="Укажите в настройках адрес электронной почты для отправки рассылки"
        show={showEmailDialog}
        handleClose={() => setShowEmailDialog(false)}
        upButton={{
          text: "Перейти в настройки",
          callback: () => {
            setShowEmailDialog(false);
            history.push(routes.settings.base);
          },
        }}
        downButton={{
          text: "Позже",
          callback: () => setShowEmailDialog(false),
        }}
      />
      <Grid container justify="center">
        <Grid item xs={11} lg={9} container>
          <Grid item sm={2} className={classes.leftContent} id="appLeft">
            <Sidebar>
              <NavTabs />
            </Sidebar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={10}
            className={classes.rightContent}
            id="appRight"
          >
            <Suspense fallback={<PageProgress />}>
              <Switch>
                {/** home **/}
                <Route path={routes.personal.base} exact>
                  <Personal />
                </Route>
                <Route path={routes.personal.admin.tariffs.change}>
                  <AdminChangeTariff />
                </Route>
                <Route path={routes.personal.admin.services.change}>
                  <AdminChangeService />
                </Route>
                {/** services **/}
                <Route path={routes.expenses.base}>
                  <Expenses />
                </Route>
                <Route path={routes.numbers.base}>
                  <Numbers />
                </Route>
                <Route path={routes.services.base}>
                  <Services />
                </Route>
                <Route path={routes.tariffs.base}>
                  <Tariffs />
                </Route>
                <Route path={routes.support.base}>
                  <Support />
                </Route>
                <Route path={routes.settings.base}>
                  <Settings />
                </Route>
                <Route path={routes.balances.base}>
                  <Balances />
                </Route>
                <Redirect to={routes.personal.base} />
              </Switch>
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
