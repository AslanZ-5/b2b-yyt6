import { FC, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";

import Button from "components/ui/Button";
import Search from "components/ui/Search";
import InfoDialog from "components/ui/InfoDialog";
import PageProgress from "components/ui/PageProgress";

import { useCRUDRequest } from "hooks/useRequest";
import { getNumbersServices } from "api/numbers";
import { useAppSelector } from "store";
import { disableService } from "api/services";

import { NumberService } from "../../types/NumberService";
import ListItem from "../list-item";
import { useStyles } from "./styles";

interface IProps {
  connectService: () => void;
}

const NumberServices: FC<IProps> = ({ connectService }) => {
  const classes = useStyles();
  const { list } = useAppSelector((state) => state.numbers);
  const currentNumber = list?.find((item) => item.checked);
  const [search, setSearch] = useState("");
  const { data: services, callback: getServices } = useCRUDRequest<
    NumberService[]
  >({
    api: getNumbersServices,
  });
  const {
    data: deleteServiceResponse,
    callback: deleteServiceCallback,
    errors: deleteServiceErrors,
    loading: deleteLoading,
  } = useCRUDRequest<NumberService[]>({
    api: disableService,
  });
  const [filteredItems, setFilteredItems] = useState<NumberService[]>([]);

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceForRemove, setServiceForRemove] =
    useState<NumberService | null>(null);

  // Получение услуг

  useEffect(() => {
    getServices({ msisdn: currentNumber?.msisdn || "" });
  }, [currentNumber?.msisdn, getServices]);

  useEffect(() => {
    if (services?.length) setFilteredItems(services);
  }, [services]);

  // Обработка поиска

  const executeSearch = () => {
    setFilteredItems([
      ...(services?.filter(
        (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      ) || []),
    ]);
  };

  // Удаление услуги

  const executeRemove = async () => {
    const data = {
      servId: serviceForRemove?.servId || 0,
      msisdn:
        list
          ?.filter((item) => item.checked)
          ?.map((item) => item.msisdn.toString()) || [],
    };
    await deleteServiceCallback(data);
  };

  useEffect(() => {
    // успешно
    if (!deleteServiceErrors?.message && deleteServiceResponse) {
      setOpenSuccessDialog(true);
    }
  }, [deleteServiceResponse, deleteServiceErrors?.message]);

  useEffect(() => {
    // ошибка
    if (deleteServiceErrors?.message) {
      setOpenErrorDialog(false);
    }
  }, [deleteServiceErrors?.message]);

  // Открытие модалки для подтверждения удаления услуги

  const openDeleteModal = (service: NumberService) => {
    setServiceForRemove(service);
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <InfoDialog
        type="success"
        title="Операция успешно выполнена"
        show={openSuccessDialog}
        handleClose={() => setOpenSuccessDialog(false)}
        upButton={{
          callback: () => setOpenSuccessDialog(false),
        }}
        downButton={{
          show: false,
        }}
      />
      <InfoDialog
        type="error"
        show={openErrorDialog}
        title="Во время операции произошла ошибка"
        description={deleteServiceErrors?.message || "Попробуйте позже."}
        handleClose={() => setOpenErrorDialog(false)}
        downButton={{
          callback: () => setOpenErrorDialog(false),
        }}
        upButton={{
          show: false,
        }}
      />
      <InfoDialog
        type="error"
        show={openDeleteDialog}
        title="Вы действительно хотите отключить услугу?"
        handleClose={() => setOpenDeleteDialog(false)}
        downButton={{
          text: "Отмена",
          callback: () => setOpenDeleteDialog(false),
        }}
        upButton={{
          text: "Да",
          callback: async () => {
            await executeRemove();
            setOpenDeleteDialog(false);
          },
        }}
      >
        {deleteLoading ? <PageProgress /> : null}
      </InfoDialog>
      <div className={classes.pageTitle}>Подключенные услуги</div>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.header}
        wrap="nowrap"
      >
        <div className={classes.info}>
          Подключено услуг: {services?.length || 0}
        </div>
        <Button
          text="Подключить услугу"
          onClick={connectService}
          additionalClasses={{ width: "160px" }}
        />
      </Grid>
      <Search
        value={search}
        setValue={setSearch}
        placeholder="Поиск услуги"
        startAdornment={<img src="/images/icons/search.svg" alt="reset" />}
        endAdornment={
          <MaterialButton className={classes.searchBtn}>
            <img src="/images/icons/arrow-right.svg" alt="reset" />
          </MaterialButton>
        }
        buttonHandler={executeSearch}
      />
      {filteredItems?.length ? (
        <div className={classes.listWrapper}>
          <div className={classes.listContainer}>
            <div className={`${classes.listHeader} ${classes.listRow}`}>
              <div className={classes.listDateColumn}>Дата подключения</div>
              <div className={classes.listNameColumn}>Название услуги</div>
              <div className={classes.listCostColumn}>Стоимость с НДС</div>
            </div>
            {filteredItems?.map((item) => (
              <ListItem
                key={item.name}
                service={item}
                openDeleteModal={openDeleteModal}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NumberServices;
