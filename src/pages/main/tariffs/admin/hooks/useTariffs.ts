import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

import { useAppSelector } from "store";
import {
  getAvailableTariffs,
  changeTariff as changeTariffRequest,
} from "api/tariffs";
import { Tariff as BaseTariff } from "types/Tariff";
import { useCRUDRequest } from "hooks/useRequest";

type ExtendedTariff = {
  msisdnWithTariff: string[];
  msisdnToConnectCount: number;
};

export type AvailableTariff = BaseTariff & ExtendedTariff;

const useTariffs = (
  search: string,
  setDialogs: Dispatch<
    SetStateAction<{
      action: boolean;
      noMoney: boolean;
      noEmail: boolean;
      successWithEmail: boolean;
      successWithoutEmail: boolean;
      error: boolean;
    }>
  >
) => {
  const { list } = useAppSelector((state) => state.numbers);
  const { user } = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [initialTariffs, setInitialTariffs] = useState<AvailableTariff[]>([]);
  const [tariffs, setTariffs] = useState<AvailableTariff[]>([]);
  const [selectedTariff, setSelectedTariff] = useState<AvailableTariff | null>(
    null
  );
  const {
    callback: changeTariffCallback,
    data: changeTariffResponse,
    errors: changeTariffErrors,
  } = useCRUDRequest({ api: changeTariffRequest });

  // получение данных в начале

  useEffect(() => {
    const getSelectedNumbers = () =>
      list
        ?.filter((item) => item.checked)
        ?.map((item) => item.msisdn.toString()) || [];

    const fetchTariffs = async () => {
      try {
        setSelectedTariff(null);
        const selectedNumbers = getSelectedNumbers();
        const response: { data: AvailableTariff[] } = await getAvailableTariffs(
          {
            msisdn: selectedNumbers,
          }
        );
        setTariffs(response.data);
        setInitialTariffs(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchTariffs();
  }, [list]);

  // логика смены

  const changeTariff = useCallback(async () => {
    setActionLoading(true);
    const data = {
      id: selectedTariff?.id || 0,
      msisdn:
        list
          ?.filter((item) => item.checked)
          ?.map((item) => item.msisdn.toString()) || [],
    };
    await changeTariffCallback(data);
  }, [changeTariffCallback, list, selectedTariff?.id]);

  useEffect(() => {
    // успешно
    if (!changeTariffErrors?.message && changeTariffResponse) {
      if (user?.email) {
        setDialogs((prev) => ({
          ...prev,
          successWithEmail: true,
          action: false,
        }));
      } else {
        setDialogs((prev) => ({
          ...prev,
          successWithoutEmail: true,
          action: false,
        }));
      }
      setActionLoading(false);
    }
  }, [
    changeTariffResponse,
    changeTariffErrors?.message,
    setDialogs,
    user?.email,
  ]);

  useEffect(() => {
    // ошибка
    if (changeTariffErrors?.message) {
      setDialogs((prev) => ({ ...prev, error: true, action: false }));
      setActionLoading(false);
    }
  }, [changeTariffErrors?.message, setDialogs]);

  // обработка поиска

  useEffect(() => {
    if (!search) setTariffs(initialTariffs);
    else {
      const filteredTariffs =
        initialTariffs?.filter(
          (tariff) =>
            tariff.name
              .toLocaleLowerCase()
              .indexOf(search.toLocaleLowerCase()) !== -1
        ) || [];
      setTariffs([...filteredTariffs]);
    }
  }, [initialTariffs, search]);

  return {
    actionLoading,
    loading,
    tariffs,
    selectedTariff,
    setSelectedTariff,
    changeTariff,
  };
};

export default useTariffs;
