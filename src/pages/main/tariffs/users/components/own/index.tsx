import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "store";
import { fetchCurrentTariff } from "store/slices/tariffs";

import PageProgress from "components/ui/PageProgress";
import TariffDetail from "components/base/tariffs/detail";

const OwnTariff: FC = () => {
  const dispatch = useAppDispatch();
  const { current } = useAppSelector((state) => state.tariffs);

  useEffect(() => {
    if (!current?.data?.id) {
      dispatch(fetchCurrentTariff());
    }
  }, [current?.data?.id, dispatch]);

  if (!current?.data || current?.loading) return <PageProgress />;
  if (!current?.data?.id)
    return (
      <div style={{ fontFamily: "PTSans-Regular" }}>Тарифы не подключены.</div>
    );

  return <TariffDetail id={current?.data?.id?.toString()} isOwn />;
};

export default OwnTariff;
