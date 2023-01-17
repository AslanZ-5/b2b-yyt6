import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";

import BalanceCard from "./components/cards/balance";
import NumberCard from "./components/cards/number";
import TariffCard from "./components/cards/tariff";
import ServicesCard from "./components/cards/services";
import FastOperations from "./components/fast-operations";
import BestOffers from "./components/best-offers";
import BalancesDialog from "./components/balances-dialog/index";

import TariffDialog from "components/base/tariffs/detail-dialog";

import { useAppSelector, useAppDispatch } from "store";
import { fetchCurrentTariff } from "store/slices/tariffs";
import { routes } from "constants/routes";

import { useStyles } from "./style";
import ExpensesCard from "components/ui/ExpensesCard";

const Personal: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAppSelector((state) => state.user);
  const { current } = useAppSelector((state) => state.tariffs);
  const dispatch = useAppDispatch();

  const [openBalancesDialog, setOpenBalancesDialog] = useState(false);
  const [openTariffDialog, setOpenTariffDialog] = useState(false);

  /** для модалки тарифа админа */
  useEffect(() => {
    if (!current?.data?.id) {
      dispatch(fetchCurrentTariff());
    }
  }, [current?.data?.id, dispatch]);

  return (
    <>
      <BalancesDialog
        open={openBalancesDialog}
        setOpen={setOpenBalancesDialog}
      />
      <TariffDialog
        open={openTariffDialog}
        setOpen={setOpenTariffDialog}
        tariff={current?.data}
        isOwn={true}
      />
      <Grid container id="personalPage">
        <Grid container spacing={3} className={classes.personalPageContainer}>
          <Grid container alignItems="flex-start" item wrap="wrap" spacing={4}>
            <Grid
              container
              direction="column"
              justify="space-between"
              item
              sm={5}
              id="personalPageLeft"
            >
              <BalanceCard />
              <Box width="100%">
                <Box mt={4} mb={1}>
                  <Typography
                    className={`${classes.subTitle}`}
                    id="balanceLabel"
                  >
                    Информация о номере
                  </Typography>
                </Box>
                <NumberCard />
              </Box>
            </Grid>
            <Grid
              container
              direction="column"
              justify="space-between"
              item
              sm={7}
              xs={12}
              id="personalPageRight"
              className={classes.rightContainer}
            >
              <Box width="100%">
                <Grid justify="space-between" container item>
                  <Box mb={1}>
                    <Typography
                      className={classes.subTitle}
                      onClick={() =>
                        user?.isAdmin
                          ? setOpenTariffDialog(true)
                          : history.push(routes.tariffs.users.own)
                      }
                    >
                      Мой тариф{" "}
                      {user?.isAdmin ? null : (
                        <Tooltip
                          classes={classes}
                          title="Для изменения тарифа обратитесь к администратору."
                          placement="bottom-start"
                        >
                          <img src="/images/icons/info.svg" alt="" />
                        </Tooltip>
                      )}
                    </Typography>
                  </Box>
                  {user?.isAdmin ? (
                    <Button
                      onClick={() =>
                        history.push(routes.personal.admin.tariffs.change)
                      }
                      className={classes.textButton}
                    >
                      Сменить
                    </Button>
                  ) : null}
                </Grid>
                <TariffCard setOpenTariffDialog={setOpenTariffDialog} />
              </Box>
              <Box width="100%" mt={user?.isAdmin ? 4 : 2} mb={1}>
                <Grid justify="space-between" container item>
                  <Typography
                    className={classes.subTitle}
                    onClick={() =>
                      user?.isAdmin
                        ? setOpenBalancesDialog(true)
                        : history.push(routes.balances.base)
                    }
                  >
                    Остатки по пакетам{" "}
                    {user?.isAdmin ? null : (
                      <Tooltip
                        classes={classes}
                        title="Для изменения тарифа обратитесь к администратору."
                        placement="bottom-start"
                      >
                        <img src="/images/icons/info.svg" alt="" />
                      </Tooltip>
                    )}
                  </Typography>

                  <Button
                    onClick={() =>
                      user?.isAdmin
                        ? setOpenBalancesDialog(true)
                        : history.push(routes.balances.base)
                    }
                    className={classes.textButton}
                  >
                    Подробнее
                  </Button>
                </Grid>
              </Box>
              <ServicesCard setOpenBalancesDialog={setOpenBalancesDialog} />
            </Grid>
          </Grid>
        </Grid>
        <Box mt={4} width="100%">
          <ExpensesCard isPersonal />
        </Box>
        {user?.isAdmin ? (
          <>
            <Box mt={4} mb={2} id="personalPageFastOperationsHeader">
              <Typography
                className={classes.subTitle}
                id="personalPageFastOperationsLabel"
              >
                Быстрые операции
              </Typography>
            </Box>
            <FastOperations />
          </>
        ) : (
          <>
            <Box mt={4} mb={1} id="personalPageBestOffersHeader">
              <Typography
                className={classes.subTitle}
                id="personalPageBestOffersLabel"
              >
                Лучшие предложения
              </Typography>
            </Box>
            <BestOffers />
          </>
        )}
      </Grid>
    </>
  );
};

export default Personal;
