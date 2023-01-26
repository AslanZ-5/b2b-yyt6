import { ReactNode } from "react";

export type Question = {
  id: number;
  question: string;
  answer: string | ReactNode;
  categories: number[];
};
