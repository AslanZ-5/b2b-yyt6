import { FC } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { routes } from "constants/routes";
import { useStyles } from "./style";

const FastOperations: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const operations = [
    {
      title: "Услуги",
      img: "/images/fast-operations/services.svg",
      onClick: () => history.push(routes.services.admin.connection),
    },
    {
      title: "Блокировка и разблокировка",
      img: "/images/fast-operations/lock.svg",
      onClick: () => history.push(routes.numbers.admin.block),
    },
    {
      title: "Тарифы",
      img: "/images/fast-operations/tariffs.svg",
      onClick: () => history.push(routes.tariffs.admin.change),
    },
    {
      title: "Замена SIM-карты",
      img: "/images/fast-operations/sim.svg",
      onClick: () => history.push(routes.numbers.admin.changeSim),
    },
  ];

  return (
    <Grid container justify="center" spacing={3}>
      {operations.map((operation) => (
        <Grid
          item
          xs={12}
          sm={3}
          key={operation.title}
          onClick={operation.onClick}
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classes.itemWrapper}
          >
            <img className={classes.img} src={operation.img} alt="" />
            <div className={classes.title}>{operation.title}</div>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default FastOperations;
