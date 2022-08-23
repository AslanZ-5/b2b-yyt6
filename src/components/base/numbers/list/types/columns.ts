export type ColumnOrder = "asc" | "desc";

export type ColumnName =
  | "fio"
  | "msisdn"
  | "tariffName"
  | "account"
  | "icc"
  | "statId";

export type ColumnValue = {
  active: boolean;
  order: ColumnOrder;
};

export type ColumnState = {
  [name in ColumnName]: ColumnValue;
};
