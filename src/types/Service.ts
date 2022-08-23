export type Service = {
  id: number;
  name: string;
  description: string;
  conditions: string;
  area: string;
  price: number;
  unit_id: number;
  categories: Array<number>;
  is_active: boolean;
  status_id: "0" | "1" | "2" | "3" | "4";
};
