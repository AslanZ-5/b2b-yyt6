import { Question } from "types/Question";

export const USEFUL_COMMANDS_QUESTION: Question = {
  question: "Полезные команды",
  id: -1,
  categories: [],
  answer: (
    <p style={{ margin: 0 }}>
      Отображение текущего баланса - <b>*100#</b>
      <br />
      Отображение остатка минут и SMS - <b>*100*1#</b>
      <br />
      Отображение остатка Гб - <b>*815#</b>
      <br />
      Узнать свой номер - <b>*222#</b>
      <br />
      <br />
      Переадресация (При настройке переадресации номер телефона должен быть в
      международном формате: +7 (номер абонента)) <br />
      <br />
      Переадресация всех звонков ВКЛ - <b>**21*номер#</b> ОТКЛ - <b>##21#</b>
      <br />
      Переадресация, если вы не ответили за 30 сек. ВКЛ - <b>
        **61*номер#
      </b>{" "}
      ОТКЛ - <b>##61#</b> <br />
      <br />
      Изменить время ожидания ответа на 5, 10, 15, 20, 25 сек. ВКЛ -{" "}
      <b>**61*номер**время ожидания ответа#</b> Переадресация, если номер занят
      ВКЛ - <b>**67*номер#</b> ОТКЛ - <b>##67#</b> <br />
      Переадресация, если номер недоступен ВКЛ - <b>**62*номер#</b> ОТКЛ -{" "}
      <b>##62#</b>
      <br />
      Отмена всех переадресаций - <b>##002#</b>
    </p>
  ),
};
