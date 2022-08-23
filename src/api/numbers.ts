import axios from "axios";
import { MAIN_HOST } from "constants/api";
import { OperationType } from "pages/main/numbers/admin/components/block/types/OperationType";

export const getNumbers = () =>
  axios(`${MAIN_HOST}/api/v1/client/legal-entity/msisdn/list`).then(
    (response) => response.data
  );

export const getNumbersServices = ({ msisdn }: { msisdn: string }) =>
  axios(
    `${MAIN_HOST}/api/v1/client/legal-entity/msisdn/${msisdn}/services/enabled`
  ).then((response) => response.data);

export const blockNumber = ({
  operationType,
  data,
}: {
  operationType: OperationType;
  data: {
    inform: boolean;
    msisdn: string[];
    email: string;
    phone: string;
    blockDate?: string;
    unblockDate: string;
  };
}) =>
  axios
    .post(
      `${MAIN_HOST}/api/v1/client/legal-entity/msisdn/${operationType}`,
      data
    )
    .then((response) => response.data);
