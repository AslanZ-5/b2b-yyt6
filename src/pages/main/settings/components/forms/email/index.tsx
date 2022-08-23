import { FC, useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Button from "components/ui/Button";
import Input from "components/ui/Input";
import InfoDialog from "components/ui/InfoDialog";

import useForm from "hooks/useForm";
import { useCRUDRequest } from "hooks/useRequest";
import { editEmail as editEmailRequest } from "api/settings";
import { useAppDispatch, useAppSelector } from "store";
import { setUser } from "store/slices/user";

import { useStyles } from "./style";
import { User } from "types/User";
import { regex } from "constants/regex";

const EmailForm: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { values, errors, handleInputValue, formIsValid } = useForm({
    initialValues: { email: "" },
    rules: {
      email: { required: true, pattern: regex.email },
    },
  });
  const {
    data: emailResponse,
    errors: emailErrors,
    callback: changeEmail,
  } = useCRUDRequest<User>({ api: editEmailRequest });

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const submitForm = async () => {
    if (!formIsValid()) return;
    await changeEmail(values.email);
  };

  useEffect(() => {
    if (!emailErrors?.message && emailResponse) {
      dispatch(setUser(user ? { ...user, email: emailResponse?.email } : null));
      setOpenSuccessDialog(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, emailResponse, emailErrors?.message]);

  useEffect(() => {
    if (emailErrors?.message) setOpenErrorDialog(true);
  }, [emailErrors?.message]);

  const disableButton = !Boolean(values.email && formIsValid());

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
        description={emailErrors?.message || "Попробуйте позже."}
        handleClose={() => setOpenErrorDialog(false)}
        downButton={{
          callback: () => setOpenErrorDialog(false),
        }}
        upButton={{
          show: false,
        }}
      />
      <Box width="100%" pr="50px">
        <Grid container alignItems="center">
          <Grid item sm={5}>
            <div className={classes.label}>Новый адрес</div>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            item
            sm={5}
          >
            <Input
              value={values.email}
              setValue={handleInputValue}
              name="email"
              {...(errors?.email
                ? { error: true, helperText: errors.email }
                : { error: false, helperText: "" })}
            />
          </Grid>
        </Grid>
        <Box width="100%" mt="24px">
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
      </Box>
    </>
  );
};

export default EmailForm;
