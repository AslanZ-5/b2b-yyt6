import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const getTariffs = () =>
  axios
    .get(`${MAIN_HOST}/api/v1/client/tariffs/available`)
    .then((response) => response.data);

export const getAvailableTariffs = (data: { msisdn: string[] }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/legal-entity/tariffs/available`, data)
    .then((response) => response.data);

export const changeTariff = (data: { id: number; msisdn: string[] }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/legal-entity/tariffs/${data.id}/change`, {
      msisdn: data.msisdn,
    })
    .then((response) => response.data);

export const getCurrentTariff = () =>
  axios(`${MAIN_HOST}/api/v1/client/tariffs`).then((response) => response.data);
