import React, { useEffect, FC } from "react";
import { useHistory } from "react-router-dom";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import TarrifDoughnut from "components/ui/TarrifDoughnut";
import { baseColors } from "constants/colors";
import { routes } from "constants/routes";
import { fetchBalance } from "store/slices/balance";
import { useAppSelector, useAppDispatch } from "store";

import { useStyles } from "./style";

function formatCount(count: number, decimals = 1) {
  const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
  let result = parseFloat(
    ((count - 100) / Math.pow(1000, i)).toFixed(decimals)
  );
  return result;
}

interface IProps {
  setOpenBalancesDialog: (open: boolean) => void;
}

const ServicesCard: FC<IProps> = ({ setOpenBalancesDialog }) => {
  const clientBalance = useAppSelector((state) => state.balance.data);
  const { appInfo } = useAppSelector((state) => state.app);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const classes = useStyles({ isAdmin: user?.isAdmin || false });
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const propperInternetValue = (value: number) =>
    value > 999 ? formatCount(value) : Math.floor(value);

  const phoneDoughnuts =
    clientBalance?.remains?.filter((el) => el.quota.type === "phone") || [];
  let phoneSum = 0;
  let phoneRestSum = 0;
  phoneDoughnuts.forEach((el) => {
    phoneRestSum =
      +el.value === -1 || phoneRestSum === -1 ? -1 : phoneRestSum + +el.value;
    phoneSum =
      +el.quota.value === -1 || phoneSum === -1
        ? -1
        : phoneSum + +el.quota.value;
  });

  const smsDoughnuts =
    clientBalance?.remains?.filter((el) => el.quota.type === "sms") || [];
  let smsSum = 0;
  let smsRestSum = 0;
  smsDoughnuts.forEach((el) => {
    smsRestSum =
      +el.value === -1 || smsRestSum === -1 ? -1 : smsRestSum + +el.value;
    smsSum =
      +el.quota.value === -1 || smsSum === -1 ? -1 : smsSum + +el.quota.value;
  });

  const internetDoughnuts =
    clientBalance?.remains?.filter((el) => el.quota.type === "internet") || [];
  let internetSum = 0;
  let internetRestSum = 0;
  internetDoughnuts.forEach((el) => {
    internetRestSum =
      +el.value === -1 || internetRestSum === -1
        ? -1
        : internetRestSum + +el.value;
    internetSum =
      +el.quota.value === -1 || internetSum === -1
        ? -1
        : internetSum + +el.quota.value;
  });

  const servicesDoughnuts = [
    {
      all: phoneSum,
      rest: phoneRestSum,
      unit_id: phoneDoughnuts[0]?.quota?.unit_id,
      expires: phoneDoughnuts[0]?.expires,
      defaultLabel: "МИН",
    },
    {
      all: smsSum,
      rest: smsRestSum,
      unit_id: smsDoughnuts[0]?.quota?.unit_id,
      expires: smsDoughnuts[0]?.expires,
      defaultLabel: "SMS",
    },
    {
      all: internetSum,
      rest: internetRestSum,
      unit_id: internetDoughnuts[0]?.quota?.unit_id,
      expires: internetDoughnuts[0]?.expires,
      defaultLabel: "ГБ",
    },
  ].map((el, i) => {
    return el.all !== 0 ? (
      <TarrifDoughnut
        key={i}
        width={95}
        title={`До ${format(new Date(parseISO(el.expires)), "dd.MM.yyyy")}`}
        data={{
          datasets: [
            {
              data: [
                el.all === -1 ? 1 : el.rest,
                el.all === -1 ? 0 : el.all - el.rest,
              ],
              backgroundColor: [baseColors.primaryAqua, baseColors.lightGrey],
            },
          ],
        }}
        content={
          <Grid
            className={classes.innerContent}
            item
            onClick={
              user?.isAdmin
                ? () => setOpenBalancesDialog(true)
                : () => history.push(routes.balances.base)
            }
          >
            <Typography>
              {el.all === -1 ? (
                <img src="/images/icons/endless.svg" alt="endless" />
              ) : (
                propperInternetValue(el.rest)
              )}
            </Typography>
            <Typography component="span">
              {el.rest > 999 && el.unit_id === 4
                ? "ГБ"
                : appInfo?.categories.units.find(
                    (info) => info.id === el.unit_id
                  )?.name}
            </Typography>
          </Grid>
        }
      />
    ) : (
      <TarrifDoughnut
        key={i}
        width={95}
        title={`Согласно тарифу`}
        data={{
          datasets: [
            {
              data: [1, 0],
              backgroundColor: [baseColors.lightGrey, baseColors.lightGrey],
            },
          ],
        }}
        content={
          <Grid
            className={classes.innerContent}
            item
            onClick={
              user?.isAdmin
                ? () => setOpenBalancesDialog(true)
                : () => history.push(routes.balances.base)
            }
          >
            <span>{el.defaultLabel}</span>
          </Grid>
        }
      />
    );
  });

  return (
    <Card
      className={classes.servicesCard}
      onClick={
        !user?.isAdmin ? () => history.push(routes.balances.base) : () => {}
      }
    >
      <Grid container justify="space-around" alignItems="flex-start">
        {servicesDoughnuts}
        {user?.isAdmin ? (
          <Grid
            item
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              history.push(routes.personal.admin.services.change);
            }}
            className={classes.addDoughnut}
          >
            <div>
              <AddIcon />
            </div>
            <Typography>Добавить</Typography>
          </Grid>
        ) : null}
      </Grid>
      {user?.isAdmin ? (
        <Button
          className={classes.addBtn}
          onClick={() => {
            history.push(routes.personal.admin.services.change);
          }}
        >
          Добавить пакет
        </Button>
      ) : null}
    </Card>
  );
};

export default ServicesCard;
