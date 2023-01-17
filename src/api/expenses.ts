import axios from "axios";
import { MAIN_HOST } from "constants/api";

export const getExpenses = (start: string, end: string) =>
  axios(
    `${MAIN_HOST}/api/v1/client/costs/statistics?start_date=${start}&finish_date=${end}`
  ).then((response) => response.data);

export const getExpensesDetalization = (start: string, end: string) =>
  axios(
    `${MAIN_HOST}/api/v1/client/costs?start_date=${start}&finish_date=${end}`
  ).then((response) => response.data);

export const sendDetalization = (start: string, end: string, email: string) =>
  axios
    .post(`${MAIN_HOST}/api/v1/client/history/export`, {
      email,
      start_date: start,
      finish_date: end,
    })
    .then((response) => response.data);

export const getDetalizationPDF = (start: string, end: string) =>
  axios.post(
    `${MAIN_HOST}/api/v1/client/history/export?download`,
    { start_date: start, finish_date: end },
    {
      responseType: "blob",
      headers: { Accept: "application/pdf" },
    }
  );
