import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

import BackLink from "components/ui/BackLink/index";
import PageProgress from "components/ui/PageProgress";
import ConnectService from "pages/main/services/admin/components/services";

import { routes } from "constants/routes";
import { useAppSelector, useAppDispatch } from "store";
import { useCRUDRequest } from "hooks/useRequest";
import { getNumbers } from "api/numbers";
import { MsisdnNumber } from "types/MsisdnNumber";
import { setData, setLoading } from "store/slices/numbers";
import useCheckAdmin from "hooks/useCheckAdmin";

import { useStyles } from "./styles";

const ChangeAdminTariff: FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { list } = useAppSelector((state) => state.numbers);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { data, callback } = useCRUDRequest<MsisdnNumber[]>({
    api: getNumbers,
  });

  useCheckAdmin();

  useEffect(() => {
    if (!list) {
      callback();
    } else {
      dispatch(
        setData(
          list?.map((item) => ({
            ...item,
            checked: user ? +item.msisdn === +user.msisdn : false,
          })) || list
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.length && !list?.length) {
      dispatch(
        setData(
          data?.map((item) => ({
            ...item,
            checked: user ? +item.msisdn === +user.msisdn : false,
          })) || data
        )
      );
      dispatch(setLoading(false));
    }
  }, [data, dispatch, list, user]);

  return (
    <>
      <Box mb="18px">
        <BackLink onClick={() => history.push(routes.personal.base)}>
          Назад
        </BackLink>
      </Box>
      <Box mb="18px" className={classes.pageTitle}>
        Подключение услуги
      </Box>
      {!list ? <PageProgress /> : <ConnectService type="connection" />}
    </>
  );
};

export default ChangeAdminTariff;
