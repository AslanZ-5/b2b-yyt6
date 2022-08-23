import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useHistory } from "react-router";

import { routes } from "constants/routes";
import {
  getAvailableServices,
  getEnabledServices,
  enableService as enableServiceRequest,
  disableService as disableServiceRequest,
} from "api/services";
import { useCRUDRequest } from "hooks/useRequest";
import { useAppSelector } from "store";

export type Service = {
  servId: number;
  name: string;
  description: string;
  area: string;
  conditions: string;
  disconnectedMsisdnCount: number;
  connectedMsisdnCount: number;
  msisdnWithoutService: string[];
  price: number;
};

const useServices = (
  search: string,
  type: "connection" | "disconnection" | undefined,
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
  const history = useHistory();

  const { list } = useAppSelector((state) => state.numbers);
  const { user } = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [initialServices, setInitialServices] = useState<Service[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const {
    callback: enableServiceCallback,
    data: enableResponse,
    errors: enableResponseErrors,
  } = useCRUDRequest({ api: enableServiceRequest });
  const {
    callback: disableServiceCallback,
    data: disableResponse,
    errors: disableResponseErrors,
  } = useCRUDRequest({ api: disableServiceRequest });

  // получение сервисов

  useEffect(() => {
    const getSelectedNumbers = () =>
      list
        ?.filter((item) => item.checked)
        ?.map((item) => item.msisdn.toString()) || [];

    const fetchAvailableServices = async () => {
      try {
        setSelectedService(null);
        const selectedNumbers = getSelectedNumbers();
        const response: { data: Service[] } = await getAvailableServices({
          msisdn: selectedNumbers,
        });
        setServices(response.data);
        setInitialServices(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchEnabledServices = async () => {
      try {
        setSelectedService(null);
        const selectedNumbers = getSelectedNumbers();
        const response: { data: Service[] } = await getEnabledServices({
          msisdn: selectedNumbers,
        });
        setServices(response.data);
        setInitialServices(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    if (type === "connection") fetchAvailableServices();
    else if (type === "disconnection") fetchEnabledServices();
    else history.push(routes.personal.base);
  }, [history, list, type]);

  // логика подключения

  const enableService = useCallback(async () => {
    setActionLoading(true);
    const data = {
      servId: selectedService?.servId || 0,
      msisdn:
        list
          ?.filter((item) => item.checked)
          ?.map((item) => item.msisdn.toString()) || [],
    };
    await enableServiceCallback(data);
  }, [enableServiceCallback, list, selectedService?.servId]);

  useEffect(() => {
    // успешно
    if (!enableResponseErrors?.message && enableResponse) {
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
  }, [enableResponse, enableResponseErrors?.message, setDialogs, user?.email]);

  useEffect(() => {
    // ошибка
    if (enableResponseErrors?.message) {
      setDialogs((prev) => ({ ...prev, error: true, action: false }));
      setActionLoading(false);
    }
  }, [enableResponseErrors?.message, setDialogs]);

  // логика отключения

  const disableService = useCallback(async () => {
    setActionLoading(true);
    const data = {
      servId: selectedService?.servId || 0,
      msisdn:
        list
          ?.filter((item) => item.checked)
          ?.map((item) => item.msisdn.toString()) || [],
    };
    await disableServiceCallback(data);
  }, [disableServiceCallback, list, selectedService?.servId]);

  useEffect(() => {
    // успешно
    if (!disableResponseErrors?.message && disableResponse) {
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
    disableResponse,
    disableResponseErrors?.message,
    setDialogs,
    user?.email,
  ]);

  useEffect(() => {
    // ошибка
    if (disableResponseErrors?.message) {
      setDialogs((prev) => ({ ...prev, error: true, action: false }));
      setActionLoading(false);
    }
  }, [disableResponseErrors?.message, setDialogs]);

  // обработка поиска

  useEffect(() => {
    if (!search) setServices(initialServices);
    else {
      const filteredServices =
        initialServices?.filter(
          (service) =>
            service.name
              .toLocaleLowerCase()
              .indexOf(search.toLocaleLowerCase()) !== -1
        ) || [];
      setServices([...filteredServices]);
    }
  }, [initialServices, search]);

  return {
    actionLoading,
    loading,
    services,
    enableService,
    disableService,
    selectedService,
    setSelectedService,
  };
};

export default useServices;
