import { FC } from "react";

import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import PageProgress from "components/ui/PageProgress";
import { formatPhone } from "helpers/formatPhone";

import { Service } from "../../hooks/useServices";
import { ActionType } from "../../types/ActionType";
import { useStyles } from "./style";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentService: Service | null;
  handleSubmit: () => void;
  loading: boolean;
  type: ActionType;
}

const ActionDialog: FC<IProps> = ({
  open,
  setOpen,
  currentService,
  handleSubmit,
  loading,
  type,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.container}
      open={open}
      id="adminServicesActionDialog"
      onClose={() => setOpen(false)}
    >
      {loading ? (
        <PageProgress />
      ) : (
        <>
          <Grid
            className={classes.header}
            container
            justify="space-between"
            alignItems="center"
          >
            <div className={classes.title}>
              {type === "connection" ? "Подключение" : "Отключение"} услуги
            </div>
            <div
              className={classes.dialogButton}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </div>
          </Grid>
          <Grid
            className={classes.row}
            container
            justify="space-between"
            alignItems="center"
          >
            <div className={classes.regularText}>
              Доступно к {type === "connection" ? "подключению" : "отключению"}
            </div>
            <div className={classes.regularText}>
              <span className={classes.boldText}>
                {type === "connection"
                  ? currentService?.disconnectedMsisdnCount
                  : currentService?.connectedMsisdnCount}
              </span>{" "}
              номеров
            </div>
          </Grid>
          <Grid
            className={classes.row}
            container
            justify="space-between"
            alignItems="center"
          >
            <div className={classes.regularText}>
              {type === "connection"
                ? "Уже подключено к услуге"
                : "Услуга не подключена"}
            </div>
            <div className={classes.regularText}>
              <span className={classes.boldText}>
                {currentService?.msisdnWithoutService?.length}
              </span>{" "}
              номеров
            </div>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            {currentService?.msisdnWithoutService?.map((item, index) => (
              <Grid
                item
                sm={6}
                key={item}
                className={`${classes.boldText} ${
                  index % 2 !== 0 ? classes.textRight : ""
                }`}
              >
                {formatPhone(item)}
              </Grid>
            ))}
          </Grid>
          {type === "connection" ? (
            <Box width="100%" mb={4} mt={4}>
              <Grid container justify="space-between" alignItems="center">
                <div className={classes.regularText}>Стоимость подключения</div>
                <div className={classes.regularText}>
                  <span className={classes.boldText}>
                    {currentService?.price}
                  </span>{" "}
                  руб.
                </div>
              </Grid>
            </Box>
          ) : null}
          <Box width="100%" mb={3}>
            <Grid container justify="center">
              <Button className={classes.btnExecute} onClick={handleSubmit}>
                Подтвердить
              </Button>
            </Grid>
          </Box>
          <Grid container justify="center">
            <Button
              className={classes.btnCancel}
              onClick={() => setOpen(false)}
            >
              Отмена
            </Button>
          </Grid>
        </>
      )}
    </Dialog>
  );
};

export default ActionDialog;
