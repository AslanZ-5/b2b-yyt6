import axios from "axios";
import { MAIN_HOST } from "constants/api";

export const editSim = (data: { msisdn: string; icc: string }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/legal-entity/usi/replace`, data)
    .then((response) => response.data);
