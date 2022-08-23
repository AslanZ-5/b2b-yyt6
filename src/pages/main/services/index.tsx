import { FC, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "constants/routes";
import PageProgress from "components/ui/PageProgress";

const UsersPage = lazy(() => import("./users"));
const AdminPage = lazy(() => import("./admin"));

const Tariffs: FC = () => {
  return (
    <Suspense fallback={<PageProgress />}>
      <Switch>
        <Route path={routes.services.users} exact>
          <UsersPage />
        </Route>
        <Route path={`${routes.services.admin.base}/:type`} exact>
          <AdminPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Tariffs;
