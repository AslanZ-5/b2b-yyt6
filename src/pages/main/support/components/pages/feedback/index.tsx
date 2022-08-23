import { FC, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Input from "components/ui/Input";
import Select from "components/ui/Select";
import PageProgress from "components/ui/PageProgress";
import Button from "components/ui/Button";
import InfoDialog from "components/ui/InfoDialog";

import useForm from "hooks/useForm";
import { useGETRequest, useCRUDRequest } from "hooks/useRequest";
import { getFeedbackSubjects, sendFeedback } from "api/support";

import { AttachInput } from "./attach-input";
import { useStyles } from "../../../style";
import { useStyles as useLocalStyles } from "./style";
import { useAppSelector } from "store";
import { regex } from "constants/regex";

type OptionsResponse = {
  subject: string;
  categories: Array<number>;
  id: number;
}[];

const getFormData = (email: string) => ({
  initialValues: { email, message: "" },
  rules: {
    email: { pattern: regex.email },
    message: { required: true },
  },
});

const Feedback: FC = () => {
  const classes = useStyles();
  const localStyles = useLocalStyles();
  const { user } = useAppSelector((state) => state.user);

  const { values, handleInputValue, formIsValid, errors } = useForm(
    getFormData(user?.email || "")
  );
  const [themeField, setThemeField] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const { data: optionsList, loading: optionsLoading } =
    useGETRequest<OptionsResponse>({
      api: getFeedbackSubjects,
    });
  const {
    loading: sendFeedbackLoading,
    callback: sendFeedbackRequest,
    errors: sendFeedbackErrors,
    data: feedbackResponse,
  } = useCRUDRequest({ api: sendFeedback });

  const options =
    optionsList?.map((option) => ({
      label: option.subject,
      value: option.subject,
    })) || [];

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("subject", themeField);
    formData.append("email", values.email);
    formData.append("message", values.message);
    formData.append("file", file || "");

    await sendFeedbackRequest(formData);
  };

  useEffect(() => {
    if (!sendFeedbackErrors?.message && feedbackResponse) {
      setOpenSuccessDialog(true);
    }
  }, [feedbackResponse, sendFeedbackErrors?.message]);

  useEffect(() => {
    if (sendFeedbackErrors?.message) setOpenErrorDialog(true);
  }, [sendFeedbackErrors?.message]);

  const disableButton = Boolean(
    !values.message || !themeField || (values.email ? !formIsValid() : false)
  );

  if (optionsLoading || sendFeedbackLoading) return <PageProgress />;

  return (
    <div id="supportFeedback">
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
        title={`Во время операции\n произошла ошибка`}
        description={"Попробуйте позже."}
        handleClose={() => setOpenErrorDialog(false)}
        downButton={{
          callback: () => setOpenErrorDialog(false),
        }}
        upButton={{
          show: false,
        }}
      />
      <div className={classes.pageTitle}>Оставить обращение</div>
      <div className={localStyles.container}>
        <Grid container alignItems="center" className={localStyles.field}>
          <Grid item xs={4}>
            <div className={localStyles.label}>Тема обращения*</div>
          </Grid>
          <Grid item xs={8}>
            <Select
              value={themeField}
              setValue={setThemeField}
              options={options}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className={localStyles.field}>
          <Grid item xs={4}>
            <div className={localStyles.label}>Электронная почта</div>
          </Grid>
          <Grid item xs={8}>
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
        <Grid container alignItems="flex-start" className={localStyles.field}>
          <Grid item xs={4}>
            <div className={localStyles.label}>Комментарий *</div>
          </Grid>
          <Grid item xs={8}>
            <Input
              value={values.message}
              setValue={handleInputValue}
              name="message"
              multiline
              rows={4}
              {...(errors?.message
                ? { error: true, helperText: errors.message }
                : { error: false, helperText: "" })}
            />
          </Grid>
        </Grid>
        <Grid container className={localStyles.field}>
          <Grid item xs={4}></Grid>
          <Grid container alignItems="center" item xs={8}>
            <Button
              text="Отправить"
              onClick={submitForm}
              additionalClasses={{
                width: "160px",
              }}
              disabled={disableButton}
            />
            <Box ml="26px">
              <AttachInput setFile={setFile} />
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Feedback;
