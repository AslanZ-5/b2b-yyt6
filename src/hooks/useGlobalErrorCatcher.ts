import { useCallback, useEffect } from "react";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshToken } from "api/user";
import { useAppDispatch } from "store";
import { useLogout } from "hooks/useLogout";
import { fetchUser } from "store/slices/user";

const useGlobalErrorCatcher = () => {
  const { logoutFromAll } = useLogout();
  const dispatch = useAppDispatch();

  const refreshAuthLogic = useCallback(
    (failedRequest: any) => {
      return refreshToken({
        refreshToken: localStorage.getItem("refresh_token") || "",
      })
        .then(
          (tokenRefreshResponse: {
            data: { token: string; refreshToken: string };
          }) => {
            dispatch(
              fetchUser(
                tokenRefreshResponse.data.token,
                tokenRefreshResponse.data.refreshToken
              )
            );
            failedRequest.response.config.headers["Authorization"] =
              tokenRefreshResponse.data.token;

            return Promise.resolve();
          }
        )
        .catch(() => {
          logoutFromAll();
        });
    },
    [logoutFromAll, dispatch]
  );

  useEffect(() => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic, {
      pauseInstanceWhileRefreshing: true,
    });
  }, [refreshAuthLogic]);
};

export default useGlobalErrorCatcher;
