import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const getUser = (token: string) =>
  axios
    .get(`${MAIN_HOST}/api/v1/client`, { headers: { Authorization: token } })
    .then((response) => response.data);

export const getEntityUser = (token: string) =>
  axios
    .get(`${MAIN_HOST}/api/v1/client/legal-entity`, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);

export const login = (data: {
  login: string;
  password: string;
  type: "password" | "otp";
}) =>
  axios
    .post(
      `${MAIN_HOST}/api/v1/client/legal-entity/login`,
      { login: data.login, password: data.password, type: data.type }
    )
    .then((response) => response.data);

export const getOtp = (data: { login: string }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/auth/otp`, data)
    .then((response) => response.data);

export const refreshToken = (data: { refreshToken: string }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/auth/refresh`, data)
    .then((response) => response.data);
