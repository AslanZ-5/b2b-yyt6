import React from "react";
import axios from "axios";
import { Redirect, Switch, Route } from "react-router-dom";
import { useAppSelector } from "store";
import { useCheckAuth } from "hooks/useCheckAuth";
import useGlobalErrorCatcher from "hooks/useGlobalErrorCatcher";
import { routes } from "constants/routes";
import Header from "components/base/header";
import Main from "pages/main";
import Auth from "pages/auth";

const App: React.FC = () => {
  const {
    loading: userLoading,
    user,
    hasUserError,
  } = useAppSelector((state) => ({
    ...state.user,
    hasUserError: state.user.error,
  }));

  axios.defaults.headers.common["Platform"] = "web";

  useCheckAuth();
  useGlobalErrorCatcher();

  const isAuth = !(hasUserError || userLoading || !user);

  return (
    <>
      {isAuth && <Header />}
      <div id="appWrapper">
        <Switch>
          {isAuth ? (
            <>
              <Route path="/">
                <Main />
              </Route>
            </>
          ) : (
            <>
              <Route path="/auth">
                <Auth />
              </Route>
            </>
          )}
          <Redirect to={routes.personal.base} />
        </Switch>
      </div>
    </>
  );
};

export default App;
