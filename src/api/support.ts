import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const getContacts = () =>
  axios(`${MAIN_HOST}/api/v1/informational/contacts`).then(
    (response) => response.data
  );

export const getQuestions = () =>
  axios(`${MAIN_HOST}/api/v1/informational/faq`).then(
    (response) => response.data
  );

export const getFeedbackSubjects = () =>
  axios(`${MAIN_HOST}/api/v1/app/feedback/subjects`).then(
    (response) => response.data
  );

export const sendFeedback = (formData: FormData) =>
  axios.post(`${MAIN_HOST}/api/v1/app/feedback`, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

export const getOffices = () =>
  axios(`${MAIN_HOST}/api/v1/informational/offices`).then(
    (response) => response.data
  );
