/**
 * Форматирование номера телефона пользователя
 * @param phone - номер телефона
 * @returns - номер телефона в формате +7 000 000 00 00
 **/
export const formatPhone = (phone: string) => {
  if (!phone) return "";
  return `+7 ${phone.substring(0, 3)} ${phone.substring(
    3,
    6
  )} ${phone.substring(6, 8)} ${phone.substring(8)}`;
};

/**
 * Форматирование номера телефона пользователя
 * @param phone - номер телефона
 * @returns - номер телефона в формате +7 (000) 000-00-00
 **/
 export const formatPhone1 = (phone: string) => {
  if (!phone) return "";
  return `+7 (${phone.substring(0, 3)}) ${phone.substring(
    3,
    6
  )}-${phone.substring(6, 8)}-${phone.substring(8)}`;
};