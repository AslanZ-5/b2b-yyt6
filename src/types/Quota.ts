export type Quota = {
  type: "call" | "internet" | "price" | "sms";
  value: string;
  unit_id: number;
};
