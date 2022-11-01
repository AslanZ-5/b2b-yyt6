import { FC } from "react";
import Grid from "@material-ui/core/Grid";

import { useAppSelector } from "store";
import useFetchAppInfo from "hooks/useFecthAppInfo";
import PageProgress from "components/ui/PageProgress";

import Card from "./card/index";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";

const Balances: FC = () => {
  const classes = useStyles();
  const { data } = useAppSelector((state) => state.balance);
  const { loading } = useFetchAppInfo();

  const phoneBalances =
    data?.remains?.filter((item) => item?.quota?.type === "phone") || [];
  const messagesBalances =
    data?.remains?.filter((item) => item?.quota?.type === "sms") || [];
  const internetBalances =
    data?.remains?.filter((item) => item?.quota?.type === "internet") || [];

  if (loading) return <PageProgress />;

  return (
    <>
      <div className={classes.title}>Пакет услуг</div>
      {phoneBalances?.length ? (
        <div>
          <div className={classes.subTitle}>Звонки</div>
          <Grid container justify="flex-start" spacing={2}>
            {phoneBalances.map((balance) => (
              <Grid item sm={4} xs={12} key={balance.name}>
                <Card balance={balance} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : <Typography variant="body2">Нет остатков по пакетам услуг</Typography>}
      {messagesBalances?.length ? (
        <div>
          <div className={classes.subTitle}>SMS</div>
          <Grid container justify="flex-start" spacing={2}>
            {messagesBalances.map((balance) => (
              <Grid item sm={4} xs={12} key={balance.name}>
                <Card balance={balance} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : null}
      {internetBalances?.length ? (
        <div>
          <div className={classes.subTitle}>Интернет</div>
          <Grid container justify="flex-start" spacing={2}>
            {internetBalances.map((balance) => (
              <Grid item sm={4} xs={12} key={balance.name}>
                <Card balance={balance} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : null}
    </>
  );
};

export default Balances;
