export type Remain = {
  name: string;
  value: string;
  expires: string;
  is_main: boolean;
  quota: {
    value: string;
    unit_id: number;
    type: "sms" | "internet" | "phone";
  };
};
