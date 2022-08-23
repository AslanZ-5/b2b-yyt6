import { FC, useState, useEffect } from "react";

import subMonths from "date-fns/subMonths";
import isAfter from "date-fns/isAfter";
import addMonths from "date-fns/addMonths";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import ChipInput from "material-ui-chip-input";

import Button from "components/ui/Button";
import MonthPicker from "components/ui/MonthPicker";
import InfoDialog from "components/ui/InfoDialog";
import PageProgress from "components/ui/PageProgress";

import { useForm } from "hooks/useForm";
import { useCRUDRequest } from "hooks/useRequest";
import { sendInvoice } from "api/invoice";
import { regex } from "constants/regex";

import { useStyles } from "./styles";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InvoiceDialog: FC<IProps> = ({ open, setOpen }) => {
  const classes = useStyles();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const maxDate = addMonths(new Date(), 1);
  const minDate = subMonths(new Date(), 12);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [finishDate, setFinishDate] = useState<Date | null>(new Date());
  const [emails, setEmails] = useState<string[]>([]);
  const [notEmailError, setNotEmailError] = useState("");
  const { values, handleInputValue, errors, clearFields } = useForm({
    initialValues: { email: "" },
    rules: { email: { pattern: regex.email } },
  });
  const {
    loading,
    errors: requestErrors,
    callback: sendInvoiceRequest,
    data: invoiceResponse,
  } = useCRUDRequest({ api: sendInvoice });

  const rangeError =
    startDate && finishDate ? isAfter(startDate, finishDate) : false;

  const handleAddChip = (newEmail: string) => {
    if (!errors.email) {
      setEmails((prev) => [...prev, newEmail]);
      clearFields();
      setNotEmailError("")
    }
  };

  const handleDeleteChip = (email: string) => {
    setEmails((prev) => [...prev.filter(item => item !== email)]);
    setNotEmailError("")
  }

  const handleButton = async () => {
    if(!emails.length){
      setNotEmailError("Введите email !")
      return
    } 
    setNotEmailError("")
    const data = {
      startDate: startDate
        ? `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().length === 1
          ? `0${startDate.getMonth()+1}`
          : startDate.getMonth()+1
        }-${startDate.getDate().toString().length === 1
          ? `0${startDate.getDate()}`
          : startDate.getDate()
        }`
        : "",
      endDate: finishDate
        ? `${finishDate.getFullYear()}-${(finishDate.getMonth() + 1).toString().length === 1
          ? `0${finishDate.getMonth()+1}`
          : finishDate.getMonth()+1
        }-${finishDate.getDate().toString().length === 1
          ? `0${finishDate.getDate()}`
          : finishDate.getDate()
        }`
        : "",
      emails,
    };
    await sendInvoiceRequest(data);
  };

  useEffect(() => {
    if (invoiceResponse && !requestErrors?.message) {
      setOpen(false);
      setShowSuccessDialog(true);
    }
  }, [invoiceResponse, requestErrors?.message, setOpen]);

  useEffect(() => {
    if (requestErrors?.message) {
      setOpen(false);
      setOpenErrorDialog(true);
    }
  }, [requestErrors?.message, setOpen]);

  useEffect(() => {
    if (!open) {
      setEmails([]);
      clearFields();
      setStartDate(new Date());
      setFinishDate(new Date());
      setNotEmailError("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <InfoDialog
        type="requestSuccess"
        title="Заявка принята"
        description="Ожидайте, отчет отправлен на email"
        show={showSuccessDialog}
        handleClose={() => setShowSuccessDialog(false)}
        downButton={{
          show: false,
        }}
        upButton={{
          text: "Ок",
          callback: () => setShowSuccessDialog(false),
        }}
      />
      <InfoDialog
        type="error"
        show={openErrorDialog}
        title="Во время операции произошла ошибка"
        description={requestErrors?.message || "Попробуйте позже."}
        handleClose={() => setOpenErrorDialog(false)}
        downButton={{
          callback: () => setOpenErrorDialog(false),
        }}
        upButton={{
          show: false,
        }}
      />
      <Dialog
        classes={{ root: classes.root }}
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
      >
        {loading ? (
          <PageProgress />
        ) : (
          <>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.header}
            >
              <div className={classes.title}>Заказать счет</div>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Box width="100%" mb="20px">
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={5}>
                  <div className={classes.label}>Период</div>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  item
                  xs={7}
                >
                  <Grid container alignItems="center" item sm={6} wrap="nowrap">
                    <Box display="flex" alignItems="center" width="160px">
                      <span className={classes.period}>{`С`}</span>
                      <MonthPicker
                        value={startDate}
                        setValue={(newValue) => setStartDate(newValue)}
                        minDate={minDate}
                        maxDate={maxDate}
                      />
                    </Box>
                  </Grid>
                  <Grid container alignItems="center" item sm={6} wrap="nowrap">
                    <Box display="flex" alignItems="center" width="170px">
                      <span className={classes.period}>{`по`}</span>
                      <MonthPicker
                        value={finishDate}
                        setValue={(newValue) => setFinishDate(newValue)}
                        minDate={startDate || minDate}
                        maxDate={maxDate}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              {rangeError ? (
                <Grid container justify="flex-end">
                  <Grid item xs={7}>
                    <div className={classes.error}>
                      Дата начала периода должна быть раньше даты конца периода.
                    </div>
                  </Grid>
                </Grid>
              ) : null}
            </Box>
            <Box width="100%" mb="44px">
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={5}>
                  <div className={classes.label}>Отправить на email</div>
                </Grid>

                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  item
                  xs={7}
                >
                  <ChipInput
                    value={emails}
                    onAdd={(chip) => handleAddChip(chip)}
                    inputValue={values.email}
                    onUpdateInput={handleInputValue}
                    InputProps={{
                      name: "email",
                    }}
                    blurBehavior="add"
                    newChipKeys={['Enter', ' ']}
                    fullWidth
                    classes={{
                      root: classes.emailsInputRoot,
                      chip: classes.emailsInputChip,
                      chipContainer: classes.emailsInputChipContainer,
                      input: classes.emailInput,
                      helperText: classes.emailsInputHelperText,
                    }}
                    disableUnderline
                    helperText={errors?.email || notEmailError || ""}
                    onDelete={handleDeleteChip}
                  />
                </Grid>
              </Grid>
            </Box>
            <div className={classes.infoContainer}>
              <div className={classes.infoHeader}>
                <img src="/images/icons/info.svg" alt="" />
                <div className={classes.infoTitle}>Внимание!</div>
              </div>
              <div className={classes.infoText}>
                1. Из-за большого размера файла некоторые почтовые серверы могут
                отказать в получении данного письма.
              </div>
              <div className={classes.infoText}>
                2. Заказ документа возможен за 12 месяцев. Заказ предыдущего
                месяца доступен после 5 числа текущего месяца.
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                text="Заказать документ"
                onClick={handleButton}
                additionalClasses={{
                  width: "210px",
                }}
                disabled={rangeError}
              />
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default InvoiceDialog;
