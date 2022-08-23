type HeaderItemType = {
  fieldKey: "fio" | "msisdn" | "tariffName" | "account" | "icc" | "statId";
  label: string;
  className:
    | "phoneField"
    | "listWrapper"
    | "checkbox"
    | "listContainer"
    | "listRow"
    | "listHeader"
    | "checkboxField"
    | "imgField"
    | "fioField"
    | "accountField"
    | "tariffField"
    | "simField"
    | "statusField";
};

export const headerItems: HeaderItemType[] = [
  { fieldKey: "msisdn", label: "Абонентский номер", className: "phoneField" },
  { fieldKey: "statId", label: "Статус", className: "statusField" },
  { fieldKey: "fio", label: "ФИО", className: "fioField" },
  { fieldKey: "account", label: "№ ЛС", className: "accountField" },
  { fieldKey: "tariffName", label: "Тариф", className: "tariffField" },
  { fieldKey: "icc", label: "Номер SIM-карты", className: "simField" },
];
