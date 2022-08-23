import { User } from "types/User";

/**
 * Получение аккаунтов текущего пользователя из локального хранилища
 * @param currentUser - текущий пользователь
 * @returns - метод парсит и возвращает акаунты пользователя
 **/
export const getUserAccountsFromLocaleStorage = (currentUser: User): User[] => {
  const existingAccounts = localStorage.getItem("accounts");
  let existingAccountsArray: User[] = [];
  let allAccounts = [];

  if (typeof existingAccounts === "string") {
    existingAccountsArray = JSON.parse(existingAccounts);
    const isUserLogged = existingAccountsArray.find(
      (existingAccount) => existingAccount.msisdn === currentUser.msisdn
    );
    allAccounts = isUserLogged
      ? existingAccountsArray
      : [...existingAccountsArray, currentUser];
  } else allAccounts = [currentUser];
  localStorage.setItem("accounts", JSON.stringify(allAccounts));
  return allAccounts;
};
