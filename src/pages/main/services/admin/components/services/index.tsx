import { FC, useState } from "react";
import { useHistory } from "react-router";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import Search from "components/ui/Search";
import NumbersInfo from "components/base/numbers/info";
import PageProgress from "components/ui/PageProgress";
import InfoDialog from "components/ui/InfoDialog";
import Input from "components/ui/Input";
import CustomScrollbar from "components/ui/CustomScrollbar";

import { useAppSelector, useAppDispatch } from "store";
import { useForm } from "hooks/useForm";
import { useCRUDRequest } from "hooks/useRequest";
import { editEmail } from "api/settings";
import { User } from "types/User";
import { setUser } from "store/slices/user";
import { routes } from "constants/routes";

import InfoBlock from "../info-block";
import CostBlock from "../cost-block";
import ServiceCard from "../service-card";
import ActionDialog from "../action-dialog";

import useServices from "../../hooks/useServices";
import { ActionType } from "../../types/ActionType";
import { useStyles } from "./styles";

interface IProps {
  type: ActionType;
}

const Services: FC<IProps> = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { data: currentBalance } = useAppSelector((state) => state.balance);
  const { user } = useAppSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [dialogs, setDialogs] = useState({
    action: false,
    noMoney: false,
    noEmail: false,
    successWithEmail: false,
    successWithoutEmail: false,
    error: false,
  });

  const {
    values,
    handleInputValue,
    errors: emailErrors,
    formIsValid: emailFormIsValid,
  } = useForm({
    initialValues: { email: "" },
    rules: { email: { pattern: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/ } },
  });

  const {
    actionLoading,
    loading,
    services,
    selectedService,
    setSelectedService,
    enableService,
    disableService,
  } = useServices(search, type, setDialogs);

  const { loading: emailLoading, callback: changeEmail } = useCRUDRequest<User>(
    { api: editEmail }
  );

  const changeService = async () => {
    if (type === "connection") await enableService();
    else await disableService();
  };

  const handleSubmit = async () => {
    if (
      selectedService?.price !== 0 &&
      currentBalance &&
      selectedService &&
      currentBalance?.balance < selectedService?.price
    ) {
      setDialogs({ ...dialogs, action: false, noMoney: true });
      return;
    }
    if (!user?.email) {
      setDialogs({ ...dialogs, action: false, noEmail: true });
    } else {
      await changeService();
    }
  };

  if (loading) return <PageProgress />;

  return (
    <>
      <ActionDialog
        open={dialogs.action}
        setOpen={(open) => setDialogs({ ...dialogs, action: open })}
        currentService={selectedService}
        handleSubmit={handleSubmit}
        loading={actionLoading}
        type={type}
      />
      <InfoDialog
        type="notEnoughMoney"
        title="На вашем лицевом счету недостаточно средств для совершения операции"
        show={dialogs.noMoney}
        handleClose={() => setDialogs({ ...dialogs, noMoney: false })}
        downButton={{
          show: false,
        }}
        upButton={{
          text: "Ок",
          callback: () => setDialogs({ ...dialogs, noMoney: false }),
        }}
      />
      <InfoDialog
        type="success"
        title={`Услуга ${type === "connection" ? "подключена" : "отключена"}`}
        description="Для получения отчета установите email."
        show={dialogs.successWithoutEmail}
        handleClose={() =>
          setDialogs({ ...dialogs, successWithoutEmail: false })
        }
        upButton={{
          text: "Перейти в настройки",
          callback: () => history.push(routes.settings.base),
        }}
        downButton={{
          text: "Позже",
          callback: () =>
            setDialogs({ ...dialogs, successWithoutEmail: false }),
        }}
      />
      <InfoDialog
        type="success"
        title={`Услуга ${type === "connection" ? "подключена" : "отключена"}`}
        description="Ожидайте, отчет отправлен на email"
        show={dialogs.successWithEmail}
        handleClose={() => setDialogs({ ...dialogs, successWithEmail: false })}
        upButton={{
          show: false,
        }}
        downButton={{
          text: "Ок",
          callback: () => setDialogs({ ...dialogs, successWithEmail: false }),
        }}
      >
        <div className={classes.email}>{user?.email || ""}</div>
      </InfoDialog>
      <InfoDialog
        type="error"
        title="Во время операции произошла ошибка"
        description="Попробуйте позже."
        show={dialogs.error}
        handleClose={() => setDialogs({ ...dialogs, error: false })}
        upButton={{
          show: false,
        }}
        downButton={{
          text: "Ок",
          callback: () => setDialogs({ ...dialogs, error: false }),
        }}
      />
      <InfoDialog
        type="noEmail"
        title="Email не установлен"
        show={dialogs.noEmail}
        loading={emailLoading}
        handleClose={async () => {
          setDialogs({ ...dialogs, noEmail: false, action: true });
          await changeService();
        }}
        upButton={{
          text: "Сохранить",
          callback: async () => {
            await changeEmail(values.email);
            const updatedUser = user ? { ...user, email: values.email } : null;
            dispatch(setUser(updatedUser));
            setDialogs({ ...dialogs, noEmail: false, action: false });
            await changeService();
          },
          disabled: Boolean(!values.email || !emailFormIsValid()),
        }}
        downButton={{
          text: "Позже",
          callback: async () => {
            setDialogs({ ...dialogs, noEmail: false, action: true });
            await changeService();
          },
        }}
      >
        <>
          <div className={classes.noEmailDialogDescription}>
            Для получения отчетов введите email:
          </div>
          <Input
            name="email"
            value={values.email}
            setValue={handleInputValue}
            {...(emailErrors?.email
              ? { error: true, helperText: emailErrors.email }
              : { error: false, helperText: "" })}
          />
        </>
      </InfoDialog>

      <Box width="100%" mb={3}>
        <Grid container justify="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} id="adminServicesSearch">
            <Search
              value={search}
              setValue={setSearch}
              placeholder="Поиск услуги"
              additionalStyles={classes}
              startAdornment={
                <img src="/images/icons/search.svg" alt="reset" />
              }
              endAdornment={
                <Button className={classes.searchBtn}>
                  <img src="/images/icons/arrow-right.svg" alt="reset" />
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} id="adminServicesNumbersInfo">
            <div className={classes.numbersInfo}>
              <NumbersInfo />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          {services?.length ? (
            services?.length > 3 ? (
              <CustomScrollbar showVertical>
                {services?.map((service) => (
                  <div key={service.servId} style={{ width: "95%" }}>
                    <ServiceCard
                      service={service}
                      selectedService={selectedService}
                      setSelectedService={setSelectedService}
                    />
                  </div>
                ))}
              </CustomScrollbar>
            ) : (
              <div>
                {services?.map((service) => (
                  <div key={service.servId} style={{ width: "95%" }}>
                    <ServiceCard
                      service={service}
                      selectedService={selectedService}
                      setSelectedService={setSelectedService}
                    />
                  </div>
                ))}
              </div>
            )
          ) : (
            <Box width="100%" pt="40px">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <img src="/images/icons/emptyServices.svg" alt="" />
                <div className={classes.emptyText}>Нет доступных услуг</div>
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid container direction="column" item xs={12} sm={6}>
          {selectedService ? (
            <Box width="100%" mb={2} id="adminServicesCostBlock">
              <CostBlock
                selectedService={selectedService}
                onClick={() => setDialogs({ ...dialogs, action: true })}
                type={type}
              />
            </Box>
          ) : null}
          <InfoBlock />
        </Grid>
      </Grid>
    </>
  );
};

export default Services;
