import { FC, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import PageProgress from "components/ui/PageProgress";
import { routes } from "constants/routes";
import SupportContainer from "./components/pages/support-container";
import QuestionCard from "./components/pages/questions/card";
import { USEFUL_COMMANDS_QUESTION } from "./constants";

const SupportList = lazy(() => import("./components/pages/list"));

const Support: FC = () => {
  return (
    <Suspense fallback={<PageProgress />}>
      <Switch>
        <Route path={routes.support.base} exact>
          <SupportList />
        </Route>
        <SupportContainer />
      </Switch>
      <QuestionCard
        question={USEFUL_COMMANDS_QUESTION}
        cardView={{
          icon: "/images/support/usefulCommands.svg",
          description: "Возможности сервиса",
        }}
      />
    </Suspense>
  );
};

export default Support;
