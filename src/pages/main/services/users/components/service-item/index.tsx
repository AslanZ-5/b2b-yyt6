import { FC } from "react";
import Grid from "@material-ui/core/Grid";

import { Service } from "types/Service";

import { useStyles } from "./style";

interface IProps {
  service: Service;
  openDialog: (service: Service) => void;
}

const ServiceItem: FC<IProps> = ({ service, openDialog }) => {
  const classes = useStyles();
  const serviceIsActive =
    service.status_id === "1" || service.status_id === "4";

  return (
    <div className={classes.container} onClick={() => openDialog(service)}>
      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.wrapper}
      >
        <div>
          <div className={classes.title}>{service.name}</div>
          <div className={classes.description}>{service.description}</div>
          {serviceIsActive ? (
            <Grid container alignItems="center">
              <img src="/images/icons/service-status.svg" alt="" />
              <div className={classes.status}>Подключено</div>
            </Grid>
          ) : null}
        </div>
        <Grid container justify="space-between" alignItems="center">
          <div className={classes.moreLink} onClick={() => {}}>
            Подробнее
          </div>
          <div className={classes.cost}>
            <span className={classes.costValue}>{service.price}</span>
            <span className={classes.costText}>руб./ мес.</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceItem;
