import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const getServices = () =>
  axios(`${MAIN_HOST}/api/v1/client/services`).then(
    (response) => response.data
  );

export const getAvailableServices = (data: { msisdn: string[] }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/legal-entity/services/available`, data)
    .then((response) => response.data);

export const getEnabledServices = (data: { msisdn: string[] }) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/legal-entity/services/enabled`, data)
    .then((response) => response.data);

export const enableService = (data: { servId: number; msisdn: string[] }) =>
  axios
    .post(
      `${MAIN_HOST}/api/v1/client/legal-entity/services/${data.servId}/enable`,
      { msisdn: data.msisdn }
    )
    .then((response) => response.data);

export const disableService = (data: { servId: number; msisdn: string[] }) =>
  axios
    .post(
      `${MAIN_HOST}/api/v1/client/legal-entity/services/${data.servId}/disable`,
      { msisdn: data.msisdn }
    )
    .then((response) => response.data);
