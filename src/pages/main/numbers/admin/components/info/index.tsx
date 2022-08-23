import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import BackLink from "components/ui/BackLink";
import BlockNumber from "pages/main/numbers/admin/components/block/components/block";
import ChangeTariff from "pages/main/tariffs/admin/components/tariffs";
import ConnectService from "pages/main/services/admin/components/services";

import { useAppSelector } from "store";
import { routes } from "constants/routes";

import InfoBlocks from "./components/info-blocks";
import Services from "./components/services";
import { useStyles } from "./styles";

type Page = "tariff" | "blocking" | "services";

const NumbersInfo: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { list } = useAppSelector((state) => state.numbers);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  const selectedNumber = list?.find((item) => item.checked) || null;

  useEffect(() => {
    if (!list?.length) history.push(routes.personal.base);
  }, [history, list?.length]);

  const PageHeader = ({ title }: { title: string }) => (
    <>
      <Box mb="18px">
        <BackLink onClick={() => setCurrentPage(null)}>Назад</BackLink>
      </Box>
      <Box mb="18px" className={classes.pageTitle}>
        {title}
      </Box>
    </>
  );

  if (currentPage === "blocking")
    return (
      <>
        <PageHeader title="Добавление блокировок" />
        <BlockNumber operationType={selectedNumber?.isBlocked ? "unblock" : "block"} successRedirect={() => setCurrentPage(null)}/>
      </>
    );

  if (currentPage === "tariff")
    return (
      <>
        <PageHeader title="Сменить тариф" />
        <ChangeTariff />
      </>
    );

  if (currentPage === "services")
    return (
      <>
        <PageHeader title="Подключение услуги" />
        <ConnectService type="connection" />
      </>
    );

  return (
    <>
      <Box mb="18px">
        <BackLink onClick={() => history.goBack()}>Назад</BackLink>
      </Box>
      <Grid
        container
        alignItems="flex-start"
        justify="space-between"
        spacing={3}
        className={classes.container}
      >
        <Grid
          container
          direction="column"
          item
          sm={6}
          xs={12}
          className={classes.infoContainer}
        >
          <Box mb="22px" className={classes.pageTitle}>
            Информация о номере
          </Box>
          <InfoBlocks
            openChangeTariff={() => setCurrentPage("tariff")}
            openBlockNumber={() => setCurrentPage("blocking")}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={classes.servicesListContainer}>
          <Services connectService={() => setCurrentPage("services")} />
        </Grid>
      </Grid>
    </>
  );
};

export default NumbersInfo;
