import { FC } from "react";

import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";

import { Service } from "types/Service";

import { useStyles } from "./style";
import { Grid } from "@material-ui/core";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  service: Service | null;
}

const ServiceDialog: FC<IProps> = ({ open, service, setOpen }) => {
  const classes = useStyles();
  return (
    <Dialog
      className={classes.container}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Grid container justify="space-between" alignItems="center">
        <div className={classes.name}>{service?.name || ""}</div>
        <div className={classes.closeBtn} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
      </Grid>
      <div className={classes.description}>{service?.description || ""}</div>
      <Grid container justify="space-between" className={classes.row}>
        <Grid item xs={4} className={classes.label}>
          Условия опции:
        </Grid>
        <Grid item xs={8} className={classes.text}>
          {service?.conditions || ""}
        </Grid>
      </Grid>
      <Grid container justify="space-between" className={classes.row}>
        <Grid item xs={4} className={classes.label}>
          Зона действия:
        </Grid>
        <Grid item xs={8} className={classes.text}>
          {service?.area || ""}
        </Grid>
      </Grid>
      <Grid container justify="space-between" className={classes.row}>
        <Grid item xs={4} className={classes.label}>
          Стоимость подключения
        </Grid>
        <Grid item xs={8} className={classes.text}>
          <span className={classes.cost}>{service?.price || ""}</span>
          <span className={classes.info}>руб.</span>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <img src="/images/icons/exclamation-mark.svg" alt="" />
        <span className={classes.info}>
          Для подключения услуги обратитесь к администратору.
        </span>
      </Grid>
    </Dialog>
  );
};

export default ServiceDialog;
