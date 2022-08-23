import { useState, useEffect } from "react";

import { fetchAppInfo } from "store/slices/app";
import { useAppSelector, useAppDispatch } from "store";

type Category = {
  id: number;
  name: string;
};

const useCategories = () => {
  const { appInfo, loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [currentCategory, setCurrentCategory] = useState<number>(7);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    dispatch(fetchAppInfo());
  }, [dispatch]);

  useEffect(() => {
    if (appInfo?.categories?.services_categories?.length) {
      const allTabs = appInfo?.categories?.services_categories;
      const allTab = allTabs.find((item) => +item.id === 7) || null;
      const allTabsWithoutAllTab =
        allTabs.filter((item) => +item.id !== 7) || [];
      setCategories(
        allTab !== null
          ? [allTab, ...allTabsWithoutAllTab]
          : allTabsWithoutAllTab
      );
    }
  }, [appInfo?.categories?.services_categories]);

  const handleTabClick = (event: React.ChangeEvent<{}>, newValue: number) => {
    /*if (newValue === 7) {
      setServicesListUI(servicesList.data);
    } else {
      Array.isArray(servicesList.data) && setServicesListUI(servicesList.data?.filter((el) => el.categories.includes(newValue)));
    }*/
    setCurrentCategory(newValue);
  };

  return {
    loading,
    categories,
    currentCategory,
    setCurrentCategory: handleTabClick,
  };
};

export default useCategories;
