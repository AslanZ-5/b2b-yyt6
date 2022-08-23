import { MsisdnNumber } from "types/MsisdnNumber";

export const getMsisdnStatus = (status: MsisdnNumber["statId"] | "") => {
  switch (status) {
    case "0":
      return "Подготовлен";
    case "1":
      return "Активен";
    case "2":
      return "Блокирован";
    case "3":
      return "Закрыт";
    case "4":
      return "Приостановлен";
    case "5":
      return "Заморожен";
    default:
      return "";
  }
};
