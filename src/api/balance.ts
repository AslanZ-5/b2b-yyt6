import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const getBalance = () =>
  axios(`${MAIN_HOST}/api/v1/client/balance`).then((response) => response.data);

export const getCommonBlance = () =>
  axios(`${MAIN_HOST}/api/v1/client/legal-entity/balance`).then(
    (response) => response.data
  );
