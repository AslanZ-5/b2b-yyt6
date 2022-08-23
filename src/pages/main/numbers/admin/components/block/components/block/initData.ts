import { User } from "types/User";
import { regex } from "constants/regex";

export interface IInitFields {
  install: {
    checked: boolean;
    value: Date | null;
  };
  remove: {
    checked: boolean;
    value: Date | null;
    error: boolean;
    helperText: string;
  };
  info: {
    checked: boolean;
  };
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const initFields: IInitFields = {
  install: {
    checked: false,
    value: new Date(),
  },
  remove: {
    checked: false,
    value: tomorrow,
    error: false,
    helperText:
      "Дата для разблокировки не может быть меньше или равной дате блокировки",
  },
  info: {
    checked: false,
  },
};

export const getFormInitData = (user: User | null) => ({
  initialValues: {
    email: user?.email || "",
    phone: user?.msisdn ? ` ${user?.msisdn}` : "",
  },
  rules: {
    email: {
      pattern: regex.email,
    },
    phone: {
      pattern: /^[+][7]\s([0-9]{3})\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})+$/,
    },
  },
});
