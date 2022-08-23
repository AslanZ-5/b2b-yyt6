export type Office = {
  id: number;
  lat: number;
  lng: number;
  address: string;
  work_time: Array<{
    week_day: string;
    hours: string;
  }>;
};
