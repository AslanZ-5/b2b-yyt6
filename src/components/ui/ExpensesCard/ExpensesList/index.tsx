import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { useStyles } from "../style";
import { Expenses, setCategory } from "store/slices/expenses";

interface ExpensesListProps {
  expenses: Expenses;
  isPersonal: Boolean;
}

const ExpensesList: FC<ExpensesListProps> = ({ expenses, isPersonal }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const services = expenses?.data?.services;

  const handleClick = (type: string) => {
    dispatch(setCategory(type));

    isPersonal && history.push("/expenses");
  };

  return (
    <Grid className={classes.expensesCardInfo} item sm={6}>
      {services &&
        expenses?.data &&
        services.map((el, index) => (
          <Grid
            container
            item
            key={index}
            justify="space-between"
            className={classes.expensesCardInfoWrapper}
            onClick={() => handleClick(el.type)}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{ backgroundColor: el.color }}
                className={`${classes.expensesCardInfoDot} info-dot`}
              ></div>
              <div>
                <Typography className={classes.expensesCardInfoTitle}>
                  {el.name}
                </Typography>
                <Typography className={classes.expensesCardInfoTime}>
                  {!(
                    el.type === "entertainment" ||
                    el.type === "roaming" ||
                    el.type === "service"
                  ) && el.total}
                </Typography>
              </div>
            </div>
            <div>
              <Typography className={classes.expensesCardInfoAmount}>
                {el.total_sum} ₽
              </Typography>
            </div>
          </Grid>
        ))}
      <Grid
        container
        item
        justify="space-between"
        className={classes.expensesCardInfoWrapper}
        onClick={() => handleClick("payments")}
      >
        <div style={{ display: "flex" }}>
          <div>
            <img
              className={`${classes.expensesCardCoinImg} info-dot`}
              src="/images/icons/coin.svg"
              alt="coin"
            />
          </div>
          <div>
            <Typography className={classes.expensesCardInfoTitle}>
              Пополнение
            </Typography>
          </div>
        </div>
        <div>
          <Typography className={classes.expensesCardInfoAmount}>
            {expenses?.data?.pay_sum} ₽
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(ExpensesList);
