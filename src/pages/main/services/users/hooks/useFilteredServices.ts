import { useState, useEffect } from "react";

import { Service } from "types/Service";

import { fetchServices } from "store/slices/services";
import { useAppSelector, useAppDispatch } from "store";

interface IProps {
  currentCategory: number;
  isOnlyConnectedServices: boolean;
  costTab: 0 | 1;
  search: string;
}

const useFilteredServices = ({
  currentCategory,
  isOnlyConnectedServices,
  costTab,
  search,
}: IProps) => {
  const { data, loading } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (data?.length) {
      setServices(data);
    }
  }, [data]);

  useEffect(() => {
    if (currentCategory && data) {
      const categoriesFilter = (service: Service) =>
        service.categories.includes(currentCategory);

      const isOnlyConnectedServicesFilter = (service: Service) =>
        isOnlyConnectedServices
          ? service.status_id === "1" || service.status_id === "4"
          : true;

      const costFilter = (service: Service) =>
        costTab === 0 ? service.price > 0 : service.price === 0;

      const searchFilter = (service: Service) =>
        search === ""
          ? true
          : service.name
              .toLocaleLowerCase()
              .indexOf(search.toLocaleLowerCase()) !== -1;

      const filteredServices = [
        ...data
          .filter((service) => isOnlyConnectedServicesFilter(service))
          .filter((service) => costFilter(service))
          .filter((service) => searchFilter(service)),
      ];

      setServices(
        currentCategory === 7
          ? [...filteredServices]
          : [...filteredServices.filter((service) => categoriesFilter(service))]
      );
    }
  }, [costTab, currentCategory, data, isOnlyConnectedServices, search]);

  return { services, loading };
};

export default useFilteredServices;
