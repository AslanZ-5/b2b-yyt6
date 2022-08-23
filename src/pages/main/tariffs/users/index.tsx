import { FC, lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { Tabs, Tab } from "@material-ui/core";

import PageProgress from "components/ui/PageProgress";
import { useAppDispatch, useAppSelector } from "store";
import { fetchTariffsList } from "store/slices/tariffs";
import useFetchAppInfo from "hooks/useFecthAppInfo";

import { useStyles } from "./style";
import { routes } from "constants/routes";

const AllPage = lazy(() => import("./components/all"));
const OwnPage = lazy(() => import("./components/own"));
const DetailPage = lazy(() => import("./components/detail"));

const UsersTariffs: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const {
    list: { loading },
  } = useAppSelector((state) => state.tariffs);
  const { user } = useAppSelector((state) => state.user);
  const pathArray = location.pathname.split("/");
  const { loading: appInfoLoading } = useFetchAppInfo();
  const [currentTab, setCurrentTab] = useState(
    pathArray[pathArray.length - 1] === "own" ? 1 : 0
  );

  const tabHandler = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
    if (newValue === 0) history.push(routes.tariffs.users.base);
    if (newValue === 1) history.push(routes.tariffs.users.own);
  };

  const openTariffDetail = parseInt(pathArray.splice(-1).join(""));

  useEffect(() => {
    dispatch(fetchTariffsList());
  }, [dispatch]);

  if (loading || appInfoLoading) return <PageProgress />;

  return (
    <>
      {openTariffDetail || user?.isAdmin ? null : (
        <Tabs
          id="userTariffsTabs"
          classes={{
            indicator: classes.indicator,
          }}
          value={currentTab}
          className={classes.tabs}
          indicatorColor="primary"
          textColor="primary"
          onChange={tabHandler}
        >
          <Tab label="Все тарифы" />
          <Tab label="Мой тариф" />
        </Tabs>
      )}

      <Suspense fallback={<PageProgress />}>
        <Switch>
          <Route path={routes.tariffs.users.own}>
            <OwnPage />
          </Route>
          <Route path={routes.tariffs.users.detail}>
            <DetailPage />
          </Route>
          <Route path={routes.tariffs.users.base}>
            <AllPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default UsersTariffs;
