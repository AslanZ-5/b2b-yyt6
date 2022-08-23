export type BestOffer = {
  id: number;
  img: string;
  text: string;
  link: string;
  sliders: Array<{ text: string; img: string; timer: number }>;
};
