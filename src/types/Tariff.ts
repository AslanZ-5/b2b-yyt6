import { Quota } from "./Quota";

export type Tariff = {
  id: number;
  tariff_id: number;
  name: string;
  description: string;
  preview: string;
  logo: string;
  price: number;
  subscriptionFee: number;
  unit: string;
  sliders: Array<{
    price: number;
    tariff_id: number;
    quotas: Quota[];
    unit: string;
  }>;
  quotas: Quota[];
  services: Service[];
  pdf: string;
};

export type Service = {
  name: string;
  descriptions: Array<{
    value: number;
    unit_id: number;
    title: string;
  }>;
};
