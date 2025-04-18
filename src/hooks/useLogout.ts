import { useCallback } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "store";
import { setAccounts, setLoading, setUser, fetchUser } from "store/slices/user";
import { useHistory } from "react-router-dom";
import { routes } from "constants/routes";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const { user, accounts } = useAppSelector((state) => state.user);
  const history = useHistory();

  const logoutFromAll = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(setUser(null));
    dispatch(setAccounts([]));

    localStorage.clear();

    delete axios.defaults.headers.common["Authorization"];

    history.push(routes.personal.auth);
  }, [dispatch, history]);

  const logoutFromCurrent = useCallback(() => {
    const accountsWithoutCurrent =
      accounts?.filter((account) => account.msisdn !== user?.msisdn) || [];

    if (accountsWithoutCurrent?.length) {
      const newCurrentUser = accounts[0];

      dispatch(setLoading(true));
      dispatch(setAccounts(accountsWithoutCurrent));
      dispatch(
        fetchUser(
          newCurrentUser?.token || "",
          newCurrentUser?.refresh_token || ""
        )
      );

      localStorage.setItem("accounts", JSON.stringify(accountsWithoutCurrent));
    } else logoutFromAll();
  }, [accounts, dispatch, logoutFromAll, user?.msisdn]);

  return { logoutFromCurrent, logoutFromAll };
};
