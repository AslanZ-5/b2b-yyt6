import { FC, useState } from "react";

import subMonths from "date-fns/subMonths";
import getDate from "date-fns/getDate";
import isAfter from "date-fns/isAfter";

import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import RadioButtonsGroup from "components/ui/Radio";
import Input from "components/ui/Input";
import SwitchUI from "components/ui/Switch";
import Select from "components/ui/Select";
import Button from "components/ui/Button";
import MonthPicker from "components/ui/MonthPicker";
import InfoDialog from "components/ui/InfoDialog";

import { useStyles } from "./styles";
import { useForm } from "hooks/useForm";

const radioDataTypes = [
  { value: "pdf", label: "PDF" },
  { value: "xml", label: "XML" },
];

const radioDayOfReceipt = [
  { value: "1", label: "В указанное число" },
  { value: "2", label: "В каждый" },
];

const dayOfReceiptSelect1Options = [
  { label: "Первый", value: "Первый" },
  { label: "Второй", value: "Второй" },
  { label: "Третий", value: "Третий" },
  { label: "Четвертый", value: "Четвертый" },
  { label: "Последний", value: "Последний" },
];

const dayOfReceiptSelect2Options = [
  { label: "Понедельник", value: "Понедельник" },
  { label: "Вторник", value: "Вторник" },
  { label: "Среда", value: "Среда" },
  { label: "Четверг", value: "Четверг" },
  { label: "Пятница", value: "Пятница" },
  { label: "Суббота", value: "Суббота" },
  { label: "Воскресенье", value: "Воскресенье" },
];

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InvoiceDialog: FC<IProps> = ({ open, setOpen }) => {
  const classes = useStyles();

  const minDate = subMonths(new Date(), 12);
  const maxDate =
    getDate(new Date()) === 5
      ? subMonths(new Date(), 2)
      : subMonths(new Date(), 1);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showMailingDialog, setShowMailingDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [period, setPeriod] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(maxDate);
  const [finishDate, setFinishDate] = useState<Date | null>(maxDate);
  const [dataType, setDataType] = useState("pdf");
  const [dayOfReceipt, setDayOfReceipt] = useState("1");
  const [dayOfReceiptSelect1, setDayOfReceiptSelect1] = useState("Последний");
  const [dayOfReceiptSelect2, setDayOfReceiptSelect2] = useState("Понедельник");
  const [isScheduleMailing, setIsScheduleMailing] = useState(false);
  const {
    values,
    handleInputValue,
    errors: inputsErrors,
  } = useForm({
    initialValues: { dayOfTheMonth: "31" },
    rules: { dayOfTheMonth: { pattern: /^[5-9]$|^[1-2][0-9]$|^3[0-1]$/ } },
    errorsMessages: {
      dayOfTheMonth: { pattern: "Значение должно быть от 5 до 31" },
    },
  });

  /*const formatDates = () => {
    const startString = format(startDate || new Date(), "LLLL yyyy", {
      locale: ru,
    });
    const endString = format(finishDate || new Date(), "LLLL yyyy", {
      locale: ru,
    });
    return `${startString.charAt(0).toUpperCase() + startString.slice(1)} - ${
      endString.charAt(0).toUpperCase() + endString.slice(1)
    }`;
  };*/

  const rangeError =
    startDate && finishDate ? isAfter(startDate, finishDate) : false;

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
        type="mailing"
        title="Ежемесячная рассылка установлена"
        show={showMailingDialog}
        handleClose={() => setShowMailingDialog(false)}
        downButton={{
          show: false,
        }}
        upButton={{
          text: "Ок",
          callback: () => setShowMailingDialog(false),
        }}
      />
      <Dialog
        classes={{ root: classes.root }}
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.header}
        >
          <div className={classes.title}>Заказать счет-фактуру</div>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Box width="100%" mb="18px">
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
              <Grid container alignItems="center" item sm={5} wrap="nowrap">
                <span className={classes.period}>{`С`}</span>
                <MonthPicker
                  value={startDate}
                  setValue={(newValue) => setStartDate(newValue)}
                  disabled={isScheduleMailing}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </Grid>
              <Grid container alignItems="center" item sm={5} wrap="nowrap">
                <span className={classes.period}>{`по`}</span>
                <MonthPicker
                  value={finishDate}
                  setValue={(newValue) => setFinishDate(newValue)}
                  disabled={isScheduleMailing}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </Grid>
            </Grid>
          </Grid>
          {rangeError && !isScheduleMailing ? (
            <Grid container justify="flex-end">
              <Grid item xs={7}>
                <div className={classes.error}>
                  Дата начала периода должна быть раньше даты конца периода.
                </div>
              </Grid>
            </Grid>
          ) : null}
        </Box>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid item xs={5}>
            <Box width="100%" pt="15px" className={classes.label}>
              Отправить на email
            </Box>
          </Grid>
          <Grid container direction="column" item xs={7}>
            <Input
              name="email"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
            />
            <div className={classes.inputHelperText}>
              Перечисляйте адреса через ";"
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.radiosContainer}
        >
          <Grid item xs={5}>
            <div className={classes.label}>Формат данных</div>
          </Grid>
          <Grid item xs={7} className={classes.radioGroup}>
            <RadioButtonsGroup
              value={dataType}
              setValue={setDataType}
              items={radioDataTypes}
            />
          </Grid>
        </Grid>
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
            2. Заказ документа возможен за 12 месяцев. Заказ предыдущего месяца
            доступен после 5 числа текущего месяца.
          </div>
        </div>
        <div className={classes.title}>
          Запланировать рассылку счета по расписанию
        </div>
        <Grid container alignItems="center" justify="space-between">
          <div className={classes.label}>Ежемесячно</div>
          <SwitchUI value={isScheduleMailing} setValue={setIsScheduleMailing} />
        </Grid>
        {isScheduleMailing ? (
          <div style={{ position: "relative" }}>
            <Box width="100%" mt="30px" mb="23px">
              <Grid container alignItems="center" justify="space-between">
                <Grid item xs={5}>
                  <div className={classes.label}>Комментарий к счету</div>
                </Grid>
                <Grid item xs={7} className={classes.radioGroup}>
                  <Input
                    name="comment"
                    value={comment}
                    setValue={(e) => setComment(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            <div className={classes.title}>Период</div>
            <Box width="100%" mb="30px">
              <Grid container alignItems="center" justify="space-between">
                <Grid item xs={5}>
                  <div className={classes.label}>
                    Закрытых месяцев в периоде
                  </div>
                </Grid>
                <Grid item xs={7} className={classes.periodInputContainer}>
                  <Input
                    name="period"
                    value={period}
                    setValue={(e) => setPeriod(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            <div className={classes.title}>День получения</div>
            <div className={classes.label}>
              Рассылка производится в указанный день с 9:00 до 12:00 по местному
              времени.
            </div>
            <Box width="100%" mt="30px" mb="40px">
              <Grid container alignItems="center" justify="space-between">
                <Grid
                  item
                  xs={5}
                  className={classes.dayOfReceiptRadiosContainer}
                >
                  <RadioButtonsGroup
                    value={dayOfReceipt}
                    setValue={setDayOfReceipt}
                    items={radioDayOfReceipt}
                  />
                </Grid>
                <Grid
                  container
                  direction="column"
                  item
                  xs={7}
                  className={classes.periodInputContainer}
                >
                  <Input
                    name="dayOfTheMonth"
                    value={values.dayOfTheMonth}
                    setValue={handleInputValue}
                    {...(inputsErrors?.dayOfTheMonth
                      ? { error: true, helperText: inputsErrors.dayOfTheMonth }
                      : { error: false, helperText: "" })}
                  />
                  <Box width="100%" mt="20px">
                    <Grid container justify="space-between" wrap="nowrap">
                      <Grid item xs={6}>
                        <Box width="90%">
                          <Select
                            value={dayOfReceiptSelect1}
                            setValue={setDayOfReceiptSelect1}
                            options={dayOfReceiptSelect1Options}
                          />
                        </Box>
                      </Grid>
                      <Grid container justify="flex-end" item xs={6}>
                        <Box width="90%">
                          <Select
                            value={dayOfReceiptSelect2}
                            setValue={setDayOfReceiptSelect2}
                            options={dayOfReceiptSelect2Options}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <div className={classes.commonInfo}>
              Следующий документ придет 3 июня и будет включать данные с 1
              Января по 1 Апреля
            </div>
          </div>
        ) : null}
        <div className={classes.buttonContainer}>
          <Button
            text={
              isScheduleMailing
                ? "Запланировать рассылку"
                : "Отправить документ"
            }
            onClick={() => {}}
            additionalClasses={{
              width: "210px",
            }}
          />
        </div>
      </Dialog>
    </>
  );
};

export default InvoiceDialog;
