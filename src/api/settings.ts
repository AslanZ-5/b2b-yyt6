import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const editEmail = (email: string) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client`, { email })
    .then((response) => response.data);

export const editPassword = (data: {
  oldPassword: string;
  newPassword: string;
}) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/password/change`, {
      current_password: data.oldPassword,
      new_password: data.newPassword,
    })
    .then((response) => response.data);

export const setPassword = (data: { password: string }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/password/set`, data)
    .then((response) => response.data);
