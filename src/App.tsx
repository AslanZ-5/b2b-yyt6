import React from "react";
import axios from "axios";
import { Redirect, Switch, Route } from "react-router-dom";

import { useAppSelector } from "store";
import { useCheckAuth } from "hooks/useCheckAuth";
import useGlobalErrorCatcher from "hooks/useGlobalErrorCatcher";
import { routes } from "constants/routes";

import Main from "pages/main";
import Header from "components/base/header";
import PageProgress from "components/ui/PageProgress";

const App: React.FC = () => {
  const { loading: userLoading, user } = useAppSelector((state) => state.user);
  const userError = useAppSelector((state) => state.user.error);

  // axios.defaults.headers.common["Platform"] = "web";
  // useCheckAuth();
  // useGlobalErrorCatcher();

  // if (userError || userLoading || !user) return <PageProgress />;

  return (
    <>
      <Header />
      <div id="appWrapper">
        <Switch>
          <Route path="/">
            <Main />
          </Route>
          <Redirect to={routes.personal.base} />
        </Switch>
      </div>
    </>
  );
};

export default App;
