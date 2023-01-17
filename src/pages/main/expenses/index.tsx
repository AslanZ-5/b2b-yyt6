import React, { FC, useState, useEffect, useCallback, LegacyRef } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  Card,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { format, getHours, getMinutes } from "date-fns";
import { useHistory } from "react-router-dom";
import fileDownload from "js-file-download";
import { useForm } from "react-hook-form";
import { dateComparison, getStrFromDate } from "helpers/dates";
import {
  getExpensesDetalizationHandler,
  setCategory,
} from "store/slices/expenses";
import { sendDetalization, getDetalizationPDF } from "api/expenses";
import { useAppSelector } from "store";
import DetailSection from "./DetailSection";
import ExpensesCard from "components/ui/ExpensesCard";
import CustomMultipleTabs from "components/ui/CustomMultipleTabs";
import InfoDialog from "components/ui/InfoDialog";
import MiniLoader from "components/ui/MiniLoader";
import ScrollTop from "components/ui/ScrollTop";
import { useStyles } from "./style";

interface IForm {
  email: string;
}

const tabs = [
  { name: "Все", id: "all" },
  { name: "Услуги", id: "service" },
  { name: "Пополнение", id: "payments" },
  { name: "Звонки", id: "calls" },
  { name: "Сообщения", id: "sms" },
  { name: "Интернет", id: "internet" },
  { name: "Роуминг", id: "roaming" },
  { name: "Развлечения", id: "entertainment" },
];

const findByPhone = (phone: string | undefined, search: string) => {
  if (!phone) return false;
  let value = search.toLowerCase().replace(/\+7|\s|\(|\)|-/g, "");
  if (phone.indexOf(value) !== -1) return true;
  if (phone.indexOf(value.substr(1)) !== -1) return true;
  return false;
};

const Expenses: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const { detalization, category, period } = useAppSelector(
    (state) => state.expenses
  );
  const { user } = useAppSelector((state) => state.user);

  const [detalizationListUI, setDetalizationListUI] = useState(
    detalization.data
  );
  const [searchValue, setSearchValue] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [detalizationSuccess, setDetalizationSuccess] = useState(false);
  const [showNoEmail, setShowNoEmail] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [paid, setIsPaid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: user?.email || "",
    },
  });

  const startDate = period[0] && format(period[0] as Date, "yyyy-MM-dd");
  const endDate = period[1] && format(period[1] as Date, "yyyy-MM-dd");

  const handleChangeTabs = (_: unknown, newValue: string) => {
    dispatch(setCategory(newValue));
  };

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);

  useEffect(() => {
    dispatch(setCategory(category));
  }, [category, dispatch]);

  useEffect(() => {
    setDetalizationListUI(
      detalization.data &&
        detalization.data.filter((el) => {
          if (category === "all") {
            return el;
          } else {
            return el.type === category;
          }
        })
    );
  }, [detalization.data, category]);

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(getExpensesDetalizationHandler(startDate, endDate));
    }
  }, [dispatch, endDate, startDate]);

  const handleMailBtnClick = () => {
    setShowEmail(true);
  };

  const closeEmailDialog = useCallback(() => setShowEmail(false), []);

  const searchHandler = () => {
    setDetalizationListUI(
      detalization.data &&
        detalization.data.filter((el) => {
          if (el.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
            return true;
          }
          return findByPhone(el.dialed, searchValue);
        })
    );
  };

  const getPDFHandler = async (type: "download" | "print") => {
    if (!startDate || !endDate) return;

    setSendLoading(true);

    try {
      const response = await getDetalizationPDF(startDate, endDate);
      const file = new Blob([response.data], { type: "application/pdf" });
      if (type === "download") {
        fileDownload(file, "detalization.pdf");
      } else {
        if (window.navigator.userAgent.indexOf("Trident/") !== -1) {
          (
            window.navigator as unknown as {
              msSaveOrOpenBlob: (file: Blob, filename: string) => void;
            }
          ).msSaveOrOpenBlob(file, "detalization.pdf");
        } else {
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }
      }
      setSendLoading(false);
    } catch (err) {
      setSendLoading(false);
    }
  };

  const onSubmit = async (data: IForm) => {
    setSendLoading(true);
    try {
      await sendDetalization(startDate || "", endDate || "", data.email);
      setSendLoading(false);
      setShowEmail(false);
      setDetalizationSuccess(true);
    } catch (err) {
      setShowEmail(false);
    }
  };

  const handlePaidTransactions = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIsPaid(event.target.checked);

  const closeDetalizationDialog = useCallback(
    () => setDetalizationSuccess(false),
    []
  );

  const closeNoEmailDialog = useCallback(() => setShowNoEmail(false), []);

  const redirectToSettings = useCallback(
    () => history.push("/settings"),
    [history]
  );

  let initialDate =
    detalization?.data && detalization.data[0]
      ? new Date(detalization.data[0].date)
      : new Date();

  let detailSectionList = null;
  if (
    detalizationListUI &&
    Array.isArray(detalizationListUI) &&
    detalizationListUI.length
  ) {
    detailSectionList = detalizationListUI
      //фильтр платных транзакций
      ?.filter((d) => (paid ? +d.total_sum > 0 : d))
      .map((el, i) => {
        //логика по отображению даты (если дата равна предыдущей, то передаётся пустая строка)
        let finalDate = "",
          time = "";
        if (dateComparison(initialDate, new Date(el.date))) {
          //тернарный оператор для отображения корректной даты первого элемента
          finalDate = i === 0 ? getStrFromDate(initialDate) : "";
        } else {
          finalDate = getStrFromDate(new Date(el.date));

          initialDate = new Date(el.date);
        }

        const hours = getHours(new Date(el.date));
        const minutes = getMinutes(new Date(el.date));

        time = `
        ${hours}:${minutes < 10 ? `${minutes}0` : minutes}
      `;

        return (
          <DetailSection
            key={i}
            name={el.name}
            img={el.img}
            sum={el.total_sum}
            description={el.description}
            date={finalDate}
            timestamp={time}
            type={el.type}
          />
        );
      });
  } else {
    detailSectionList = (
      <Typography className={classes.emptyCostsText}>
        За данный период времени информации не обнаружено.
      </Typography>
    );
  }

  const skeletonItems = (
    <Grid container direction="column" style={{ marginBottom: "-20px" }}>
      <Skeleton
        variant="text"
        animation="wave"
        style={{ marginBottom: "20px" }}
      />
      {[1, 2, 3].map((el) => {
        return (
          <Grid
            container
            justify="space-between"
            key={el}
            style={{ marginBottom: "20px" }}
          >
            <Skeleton
              variant="circle"
              width={50}
              height={50}
              animation="wave"
            />
            <Grid item style={{ flex: "1", marginLeft: "8px" }}>
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <>
      <InfoDialog
        show={detalizationSuccess}
        type="detalizationSuccess"
        title="Детализация выслана на указанный Email"
        upButton={{ show: false }}
        handleClose={closeDetalizationDialog}
        downButton={{ text: "Ок", callback: closeDetalizationDialog }}
      />
      <InfoDialog
        show={showNoEmail}
        type="noEmail"
        title="Не указан Email"
        description="Укажите в настройках адрес электронной почты для отправки детализации расходов"
        upButton={{ text: "Перейти в настройки", callback: redirectToSettings }}
        downButton={{ text: "Отмена", callback: closeNoEmailDialog }}
        handleClose={closeNoEmailDialog}
      />
      <InfoDialog
        show={showEmail}
        type="inputMail"
        title="Заказать детализацию"
        upButton={{ show: false }}
        downButton={{ show: false }}
        handleClose={closeEmailDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="center">
            <input
              className={
                errors.email
                  ? `${classes.input} ${classes.errorBorder}`
                  : classes.input
              }
              ref={
                register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email введен неверно",
                  },
                }) as unknown as LegacyRef<HTMLInputElement>
              }
              name="email"
              placeholder="Введите email"
            />
            <Typography className={classes.errorText}>
              {errors.email && errors.email.message}
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Button
              disabled={sendLoading}
              type="submit"
              className={classes.submitBtn}
            >
              Заказать
            </Button>
          </Grid>
        </form>
      </InfoDialog>
      <span id="back-to-top-anchor"></span>
      <ExpensesCard isPersonal={false} />
      <Grid
        justify="space-between"
        container
        className={classes.detalizationHeader}
      >
        <Typography component="h6">
          Детализация {sendLoading && <MiniLoader />}
        </Typography>

        <Grid>
          <IconButton
            className={classes.detalizationButton}
            disabled={sendLoading}
            onClick={handleMailBtnClick}
          >
            <img src="/images/icons/mail.svg" alt="mail" />
          </IconButton>
          <IconButton
            className={classes.detalizationButton}
            disabled={sendLoading}
            onClick={() => getPDFHandler("print")}
          >
            <img src="/images/icons/print.svg" alt="print" />
          </IconButton>
          <IconButton
            className={classes.detalizationButton}
            disabled={sendLoading}
            onClick={() => getPDFHandler("download")}
          >
            <img src="/images/icons/download.svg" alt="download" />
          </IconButton>
        </Grid>
      </Grid>
      <Card className={classes.detalizationSearch}>
        <Grid container>
          <Grid item xs={9} container alignItems="center">
            <img
              className={classes.detalizationSearchIcon}
              src="/images/icons/search.svg"
              alt="search"
            />
            <input
              className={classes.detalizationSearchInput}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Операция или номер телефона"
              onKeyUp={(e: any) => {
                if (e.key === "Enter") searchHandler();
              }}
            />
          </Grid>
          <Grid item xs={3} container alignItems="center" justify="flex-end">
            <Button onClick={searchHandler} className={classes.searchBtn}>
              Поиск
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Grid className={classes.categoryBlock} container>
        <Grid item container sm={8} alignItems="center">
          <CustomMultipleTabs
            handleChangeTabs={handleChangeTabs}
            value={category}
            tabs={tabs}
          />
        </Grid>
        <Grid item container sm={4} justify="flex-end">
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={paid}
                onChange={handlePaidTransactions}
                color="default"
              />
            }
            label="Только платные транзакции"
          />
        </Grid>
      </Grid>
      {detalization.loading ? skeletonItems : detailSectionList}
      <ScrollTop />
    </>
  );
};

export default Expenses;
