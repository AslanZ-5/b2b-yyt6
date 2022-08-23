import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { useAppSelector } from "store";
import { useStyles } from "./styles";

const CardInfo: FC = () => {
  const classes = useStyles();
  const { list } = useAppSelector((state) => state.numbers);
  const selectedNumber = list?.filter((item) => item.checked)[0] || null;
  const notDataText = "Данные отсутствуют";

  return (
    <div className={classes.container}>
      <Grid container alignItems="center" className={classes.row}>
        <Grid item xs={6} className={classes.label}>
          Номер SIM-карты
        </Grid>
        <Grid item xs={6} className={classes.value}>
          {selectedNumber?.icc || notDataText}
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.row}>
        <Grid item xs={6} className={classes.label}>
          Пользователь
        </Grid>
        <Grid item xs={6} className={classes.value}>
          {selectedNumber?.fio || notDataText}
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.row}>
        <Grid item xs={6} className={classes.label}>
          Телефонный номер
        </Grid>
        <Grid item xs={6} className={classes.value}>
          {selectedNumber?.msisdn ? `+7${selectedNumber?.msisdn}` : notDataText}
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.row}>
        <Grid item xs={6} className={classes.label}>
          Номер лицевого счёта
        </Grid>
        <Grid item xs={6} className={classes.value}>
          {selectedNumber?.account || notDataText}
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={6} className={classes.label}>
          Номер контракта
        </Grid>
        <Grid item xs={6} className={classes.value}>
          {selectedNumber?.contractNumber || notDataText}
        </Grid>
      </Grid>
    </div>
  );
};

export default CardInfo;
