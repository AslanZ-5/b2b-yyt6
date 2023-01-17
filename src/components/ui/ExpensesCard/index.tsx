import { FC, useState, useEffect, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Grid, Box, Typography, Button, Card } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import format from "date-fns/format";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "store";
import { getExpensesHandler, setPeriod } from "store/slices/expenses";
import TariffDoughnut from "../TarrifDoughnut";
import DateRangePicker from "../DateRangePicker";
import { dateComparison } from "../../../helpers/dates";
import { useStyles } from "./style";
import ExpensesList from "./ExpensesList";
import { baseColors } from "constants/colors";

interface IDoughnut {
  labels: Array<string>;
  datasets: Array<{
    data: Array<number>;
    backgroundColor: Array<string>;
    hoverBackgroundColor: Array<string>;
  }>;
}

interface ExpensesCardProps {
  isPersonal: boolean;
}

const lastMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth() - 1,
  new Date().getDate()
);

const lastWeek = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate() - 7
);

const selectedDateStyle = { color: "#a1a1a1", borderBottom: "none" };

const ExpensesCard: FC<ExpensesCardProps> = ({ isPersonal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // const [selectedDate, setSelectedDate] = useState<DateRange<Date | null>>([
  //   new Date(),
  //   new Date(),
  // ]);

  const setDateFromLastMonth = () =>
    dispatch(setPeriod([lastMonth, new Date()]));

  const setCurrentDate = () => dispatch(setPeriod([new Date(), new Date()]));

  const setDateFromLastWeek = () => dispatch(setPeriod([lastWeek, new Date()]));

  const setSelectedDate = useCallback(
    (date) => dispatch(setPeriod(date)),
    [dispatch]
  );

  const [doughnutData, setDoughnutData] = useState<IDoughnut>();

  const { expenses, period } = useAppSelector((state) => state.expenses);

  const handleClick = useCallback(() => {
    isPersonal && history.push("/expenses");
  }, [history, isPersonal]);

  const handleCostClick = () => handleClick();

  useEffect(() => {
    let data: IDoughnut = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    };

    if (expenses?.data?.services && expenses?.data?.charges_sum) {
      expenses.data.services.forEach((el) => {
        data.labels.push(el.name);
        data.datasets[0].data.push(el.total_sum);
        data.datasets[0].backgroundColor.push(el.color);
        data.datasets[0].hoverBackgroundColor.push(el.color);
      });
    } else {
      data = {
        labels: [],
        datasets: [
          {
            data: [1],
            backgroundColor: [baseColors.lightBlue],
            hoverBackgroundColor: [baseColors.primaryAqua],
          },
        ],
      };
    }

    setDoughnutData(data);
  }, [expenses]);

  useEffect(() => {
    const startDate = period[0] && format(period[0] as Date, "yyyy-MM-dd");
    const endDate = period[1] && format(period[1] as Date, "yyyy-MM-dd");

    if (startDate && endDate) {
      dispatch(getExpensesHandler(startDate, endDate));
    }
  }, [dispatch, period]);

  return (
    <>
      <Grid
        justify="space-between"
        alignItems="center"
        className={classes.expensesHeaderWrapper}
        container
      >
        <Typography
          className={classes.subTitle}
          component="h6"
          onClick={handleCostClick}
          style={{ cursor: isPersonal ? "pointer" : "auto" }}
        >
          Расходы
        </Typography>
        <Grid container alignItems="center" wrap="nowrap">
          <Grid container item xs={10}>
            {[
              { text: "за сегодня", handler: setCurrentDate, date: new Date() },
              {
                text: "за неделю",
                handler: setDateFromLastWeek,
                date: lastWeek,
              },
              {
                text: "за месяц",
                handler: setDateFromLastMonth,
                date: lastMonth,
              },
            ].map((btn) => (
              <Button
                key={btn.text}
                onClick={btn.handler}
                className={classes.periodButton}
                style={
                  dateComparison(period[0] as Date, btn.date)
                    ? selectedDateStyle
                    : {}
                }
              >
                {btn.text}
              </Button>
            ))}
            <Box width="200px" ml={1}>
              <DateRangePicker
                disableFuture
                selectedDate={period}
                handleDateChange={setSelectedDate}
              />
            </Box>
          </Grid>
          <Grid
            container
            justify="flex-end"
            item
            xs={2}
            style={isPersonal ? {} : { display: "none" }}
          >
            <Button
              className={classes.textButton}
              onClick={() => history.push("/expenses")}
            >
              Подробнее
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Card className={classes.expensesCard}>
        <Grid className={classes.expensesCardContent} container>
          {expenses.loading ? (
            <>
              <Grid
                container
                item
                sm={6}
                className={classes.expensesCardInfo}
                justify="space-between"
                direction="column"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((el) => {
                  return (
                    <div style={{ width: "100%" }} key={el}>
                      <Skeleton variant="text" />
                    </div>
                  );
                })}
              </Grid>
              <Grid container item sm={6} alignItems="center" justify="center">
                <Skeleton variant="circle" width={150} height={150} />
              </Grid>
            </>
          ) : (
            <>
              <ExpensesList expenses={expenses} isPersonal={isPersonal} />
              {!Array.isArray(expenses?.data) && doughnutData && (
                <Grid
                  item
                  container
                  sm={6}
                  justify="space-around"
                  alignItems="center"
                >
                  <TariffDoughnut
                    onClick={handleClick}
                    width={220}
                    data={doughnutData}
                    className={isPersonal ? classes.tariffDoughnut : ""}
                    content={
                      <Grid
                        className={`${classes.innerContent} ${classes.doughnutInnerContent}`}
                      >
                        <Typography>
                          {expenses?.data?.charges_sum === 0
                            ? expenses?.data?.charges_sum
                            : `-${expenses?.data?.charges_sum}`}{" "}
                          ₽
                        </Typography>
                        <Typography component="span">Расход</Typography>
                      </Grid>
                    }
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Card>
    </>
  );
};

export default memo(ExpensesCard);
