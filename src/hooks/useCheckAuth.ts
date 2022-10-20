import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { fetchUser } from 'store/slices/user';
import { routes } from 'constants/routes';

/**
 * Хук авторизации
 * Получает токены пользователя из localStorage или QueryParams и выполняет запрос на получение юзера
 * Если токена нет - редирект на ЛК физических лиц
 **/
export const useCheckAuth = () => {
  const queryParams = useLocation().search;
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    const { token, refresh_token } = getUserData(queryParams);
    if (token) {
      dispatch(fetchUser(token, refresh_token));
    } else {
      history.push(`${routes.personal.auth}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, queryParams]);
};

/**
 * Метод получает токены пользователя
 * @param queryParams
 * @returns { token: string; refresh_token: string}
 **/
const getUserData = (queryParams: string): { token: string; refresh_token: string } => {
  const { token, refresh_token } = getUserDataFromQueryParams(queryParams);
  if (token) return { token, refresh_token: refresh_token! };
  else {
    const { token, refresh_token } = getUserDataFromLocalstorage();
    return { token: token!, refresh_token: refresh_token! };
  }
};

/**
 * Метод получает токены пользователя из QueryParams
 * @param queryParams
 * @returns { token: string; refresh_token: string}
 **/
const getUserDataFromQueryParams = (queryParams: string) => {
  const token = new URLSearchParams(queryParams).get('token');
  const refresh_token = new URLSearchParams(queryParams).get('refresh_token');
  return { token, refresh_token };
};

/**
 * Метод получает токены пользователя из localStorage
 * @returns { token: string; refresh_token: string}
 **/
const getUserDataFromLocalstorage = () => {
  const token = localStorage.getItem('token');
  const refresh_token = localStorage.getItem('refresh_token');
  return { token, refresh_token };
};
