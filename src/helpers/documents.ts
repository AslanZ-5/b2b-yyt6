import { MAIN_HOST } from "constants/api";

/**
 * Загрузка докумена с базового сервера
 * @param url - адрес документа
 * @param name - название документа
 **/
export const downloadDocumentFromBaseHost = (url: string, name: string) => {
  let link = document.createElement("a");
  link.href = `${MAIN_HOST}${url}`;
  link.download = name;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
