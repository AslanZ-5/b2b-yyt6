import { FC } from "react";
import { routes } from "constants/routes";
import Card, { SupportCardProps } from "../../ui/card";

const cards: SupportCardProps[] = [
  {
    title: "Вопрос/ответ",
    description: "Ответы на часто задаваемые вопросы",
    imgSrc: "/images/support/question.svg",
    link: routes.support.questions,
  },
  // {
  //   title: "Салоны продаж и обслуживания",
  //   description: "Салоны обслуживания на карте",
  //   imgSrc: "/images/support/compass.svg",
  //   link: routes.support.salons,
  // },
  {
    title: "Контактный центр",
    description: "Задать вопрос оператору",
    imgSrc: "/images/support/headphones.svg",
    link: routes.support.contactCenter,
  },
  {
    title: "Оставить обращение",
    description: "Написать в службу поддержки",
    imgSrc: "/images/support/mail.svg",
    link: routes.support.feedback,
  },
];

const List: FC = () => (
  <div id="supportList">
    {cards.map((card) => (
      <Card key={card.title} {...card} />
    ))}
  </div>
);

export default List;
