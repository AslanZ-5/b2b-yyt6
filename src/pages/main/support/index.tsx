import { FC, lazy, Suspense } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

import BackLink from "components/ui/BackLink/index";
import PageProgress from "components/ui/PageProgress";
import { routes } from "constants/routes";

const SupportList = lazy(() => import("./components/pages/list"));
const Feedback = lazy(() => import("./components/pages/feedback"));
const Salons = lazy(() => import("./components/pages/salons"));
const Questions = lazy(() => import("./components/pages/questions"));
const ContactsCenter = lazy(() => import("./components/pages/contacts-center"));

const Support: FC = () => {
  const history = useHistory();
  const BackComponent = (
    <Box mb="12px">
      <BackLink onClick={() => history.goBack()}>Назад</BackLink>
    </Box>
  );
  return (
    <Suspense fallback={<PageProgress />}>
      <Switch>
        <Route path={routes.support.base} exact>
          <SupportList />
        </Route>
        <Route path={routes.support.feedback}>
          {BackComponent}
          <Feedback />
        </Route>
        <Route path={routes.support.salons}>
          {BackComponent}
          <Salons />
        </Route>
        <Route path={routes.support.questions}>
          {BackComponent}
          <Questions />
        </Route>
        <Route path={routes.support.contactCenter}>
          {BackComponent}
          <ContactsCenter />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Support;
