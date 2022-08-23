import { FC, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "constants/routes";
import PageProgress from "components/ui/PageProgress";

const NumbersListPage = lazy(() => import("./admin/components/list"));
const BlockNumberPage = lazy(() => import("./admin/components/block"));
const ChangeSimPage = lazy(() => import("./admin/components/change-sim"));
const NumbersInfo = lazy(() => import("./admin/components/info"));

const NumbersRouter: FC = () => {
  return (
    <Suspense fallback={<PageProgress />}>
      <Switch>
        <Route path={routes.numbers.admin.list} exact>
          <NumbersListPage />
        </Route>
        <Route path={routes.numbers.admin.block}>
          <BlockNumberPage />
        </Route>
        <Route path={routes.numbers.admin.changeSim}>
          <ChangeSimPage />
        </Route>
        <Route path={routes.numbers.admin.info}>
          <NumbersInfo />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default NumbersRouter;
