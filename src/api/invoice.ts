import axios from "axios";

import { MAIN_HOST } from "constants/api";

export const sendInvoice = (data: {
  startDate: Date | null;
  endDate: Date | null;
  emails: string[];
}) => axios.post(`${MAIN_HOST}/api/v1/client/legal-entity/invoice/order`, data);
