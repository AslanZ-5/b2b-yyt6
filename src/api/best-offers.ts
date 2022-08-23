import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const getBestOffers = () =>
  axios(`${MAIN_HOST}/api/v1/informational/best-offers`).then(
    (response) => response.data
  );
