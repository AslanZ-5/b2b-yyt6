import React, { useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { getCommonBlance } from "api/balance";

import { useStyles } from "./style";
import { useCRUDRequest } from "hooks/useRequest";
import { useAppSelector } from "store";

interface ICommonBalance {
  showBalance: false;
  sum: number;
  date: string;
}

const BalanceCard: React.FC = () => {
  const classes = useStyles();
  const { user } = useAppSelector((state) => state.user);
  const { callback, loading, data } = useCRUDRequest<ICommonBalance>({
    api: getCommonBlance,
  });
  const correctTime = data?.date?.slice(-8, -3) || "";

  useEffect(() => {
    callback();
  }, [callback]);

  if (!user?.isAdmin)
    return (
      <div className={classes.defaultBlock}>
        <img src="/images/cards/balanceCardDefault.svg" alt="" />
        <div className={classes.defaultTitle}>
          Просмотр баланса доступен только для администратора
        </div>
      </div>
    );

  return (
    <div className={classes.balanceCard}>
      <Grid container direction="column" justify="space-between">
        <div>
          <Grid container justify="space-between" alignItems="center">
            <div className={classes.title}>Баланс лицевого счета</div>{" "}
            <img
              onClick={callback}
              width={22}
              height={22}
              className={`${loading ? classes.rotation : ""} ${classes.reload}`}
              src="/images/icons/refresh.svg"
              alt="refresh"
            />
          </Grid>

          <div className={classes.text}>
            Данные на сегодня на {correctTime || ""}
          </div>
        </div>
        <div className={classes.balance}>{data?.sum || 0} ₽</div>
      </Grid>
      {/*<div className={classes.title}>Баланс номера</div>
        <div className={classes.text}>Данные на сегодня на {correctTime}</div>
          <div className={classes.balance}>122098.15 ₽</div>*/}
    </div>
  );
};

export default BalanceCard;
