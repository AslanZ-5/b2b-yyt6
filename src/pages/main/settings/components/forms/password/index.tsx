import { FC, useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Button from "components/ui/Button";
import Input from "components/ui/Input";
import InfoDialog from "components/ui/InfoDialog";

import useForm from "hooks/useForm";
import { useCRUDRequest } from "hooks/useRequest";
import { editPassword as editPasswordRequest } from "api/settings";
import { useAppDispatch } from "store";
import { fetchUser } from "store/slices/user";

import { useStyles } from "./style";

const formData = {
  initialValues: {
    oldPassword: "",
    newPassword: "",
    acceptPassword: "",
  },
  rules: {
    oldPassword: { required: true, pattern: /^[a-zA-Z0-9@*#]{8,15}$/ },
    newPassword: { required: true, pattern: /^[a-zA-Z0-9@*#]{8,15}$/ },
    acceptPassword: { required: true, pattern: /^[a-zA-Z0-9@*#]{8,15}$/ },
  },
  errorsMessages: {
    oldPassword: {
      pattern:
        "Пароль должен содержать от 8 до 15 символов и содержать символы латинского алфавита и/или цифры.",
    },
    newPassword: {
      pattern:
        "Пароль должен содержать от 8 до 15 символов и содержать символы латинского алфавита и/или цифры.",
    },
    acceptPassword: {
      pattern:
        "Пароль должен содержать от 8 до 15 символов и содержать символы латинского алфавита и/или цифры.",
    },
  },
};

const PasswordForm: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { values, errors, handleInputValue, formIsValid } = useForm(formData);
  const {
    data: passwordResponse,
    errors: passwordErrors,
    callback: changePassword,
  } = useCRUDRequest<{ token: string }>({ api: editPasswordRequest });
  const [passwordsConfirm, setPasswordsConfirm] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  useEffect(() => {
    if (
      values.newPassword &&
      values.acceptPassword &&
      values.newPassword === values.acceptPassword
    )
      setPasswordsConfirm(true);
    else setPasswordsConfirm(false);
  }, [values.acceptPassword, values.newPassword]);

  useEffect(() => {
    if (!passwordErrors?.message && passwordResponse?.token) {
      dispatch(fetchUser(passwordResponse?.token, "")); //TODO - старый токен или новый с запроса?
      setOpenSuccessDialog(true);
    }
  }, [dispatch, passwordErrors?.message, passwordResponse?.token]);

  useEffect(() => {
    if (passwordErrors?.message) setOpenErrorDialog(true);
  }, [passwordErrors?.message]);

  const submitForm = async () => {
    if (!formIsValid() || !passwordsConfirm) return;
    await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
  };

  const disableButton = !Boolean(
    values.oldPassword &&
      values.acceptPassword &&
      values.newPassword &&
      formIsValid() &&
      passwordsConfirm
  );

  return (
    <>
      <InfoDialog
        type="success"
        title="Операция успешно выполнена"
        show={openSuccessDialog}
        handleClose={() => setOpenSuccessDialog(false)}
        upButton={{
          callback: () => setOpenSuccessDialog(false),
        }}
        downButton={{
          show: false,
        }}
      />
      <InfoDialog
        type="error"
        show={openErrorDialog}
        title="Во время операции произошла ошибка"
        description={passwordErrors?.message || "Попробуйте позже."}
        handleClose={() => setOpenErrorDialog(false)}
        downButton={{
          callback: () => setOpenErrorDialog(false),
        }}
        upButton={{
          show: false,
        }}
      />
      <Box width="100%" pr="50px">
        <Grid container alignItems="center" className={classes.row}>
          <Grid item sm={5}>
            <div className={classes.label}>Старый пароль</div>
          </Grid>
          <Grid item sm={5}>
            <Input
              value={values.oldPassword}
              setValue={handleInputValue}
              name="oldPassword"
              {...(errors?.oldPassword
                ? { error: true, helperText: errors.oldPassword }
                : { error: false, helperText: "" })}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className={classes.row}>
          <Grid item sm={5}>
            <div className={classes.label}>Новый пароль</div>
          </Grid>
          <Grid item sm={5}>
            <Input
              value={values.newPassword}
              setValue={handleInputValue}
              name="newPassword"
              {...(errors?.newPassword
                ? { error: true, helperText: errors.newPassword }
                : { error: false, helperText: "" })}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className={classes.row}>
          <Grid item sm={5}>
            <div className={classes.label}>Подтвердите пароль</div>
          </Grid>
          <Grid item sm={5}>
            <Input
              value={values.acceptPassword}
              setValue={handleInputValue}
              name="acceptPassword"
              {...(errors?.acceptPassword
                ? { error: true, helperText: errors.acceptPassword }
                : { error: false, helperText: "" })}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item sm={5}></Grid>
          <Grid item sm={7}>
            <div className={classes.error}>
              {values.newPassword &&
                values.acceptPassword &&
                !passwordsConfirm &&
                "Пароль должен совпадать с новым паролем."}
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item sm={5}></Grid>
          <Grid item sm={7}>
            <Button
              text="Сохранить"
              onClick={submitForm}
              additionalClasses={{
                width: "160px",
              }}
              disabled={disableButton}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PasswordForm;
