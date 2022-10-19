import { useState, useEffect, useCallback } from "react";

/**
 * Хук для выполнения fetch запроса (GET)
 * @param api - api метод
 **/
interface IGETRequest<T> {
  api: () => Promise<{ data: T }>;
}

export const useGETRequest = <T>({ api }: IGETRequest<T>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api();
        if (response?.data) {
          setData(response?.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [api]);

  return { data, loading };
};

/**
 * Хук для выполнения fetch запроса (Create, Read, Update, Delete)
 * @param api - api метод
 **/

interface ICRUDRequest<T> {
  api: (data: any) => Promise<{ data: T }>;
}

type IError = {
  response: {
    data: {
      status: {
        message: string;
        description: string;
        status_code: number;
        status_http: number;
      };
    };
  };
};

function instanceOfIError(data: any): data is IError {
  return true; //"companyName" in data;
}

export const useCRUDRequest = <T>({ api }: ICRUDRequest<T>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<{ message: string } | null>(null);

  const callback = useCallback(
    async (data?) => {
      try {
        setErrors(null);
        setLoading(true);
        const response = await api(data);
        setData(response.data);
        setErrors(null);
        setLoading(false);
      } catch (error) {
        if (instanceOfIError(error)) {
          if (error?.response?.data?.status?.status_code)
            setErrors({ message: error?.response?.data?.status?.description });
          else setErrors({ message: "Что-то пошло не так..." });
          setLoading(false);
        } else setErrors({ message: "Что-то пошло не так..." });
      }
    },
    [api]
  );

  const clear = useCallback(() => {
    setData(null);
    setErrors(null);
  }, []);

  return { data, loading, errors, callback, clear };
};
