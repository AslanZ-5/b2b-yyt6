export type MsisdnNumber = {
  type: "phone";
  fio: string;
  tariffName: string;
  msisdn: number; // телефон
  account: number; // лицевой счет
  icc: string; // sim
  contractNumber: string;
  puk1: string;
  puk2: string;
  checked: boolean;
  statId: "0" | "1" | "2" | "3" | "4" | "5";
  isBlocked: boolean;
};
