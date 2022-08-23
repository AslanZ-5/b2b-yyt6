import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const getAppInfo = () =>
  axios(`${MAIN_HOST}/api/v1/app/info`).then((response) => response.data);
