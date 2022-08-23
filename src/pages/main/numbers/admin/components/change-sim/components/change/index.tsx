import { FC } from "react";
import Grid from "@material-ui/core/Grid";

import CardInfo from "../card-info";
import Warning from "../warning";
import Form from "../form";

import { useStyles } from "./styles";

interface IProps{
  buttonBackHandler: () => void;
}

const Change:FC<IProps> = ({buttonBackHandler}) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        alignItems="flex-start"
        justify="space-between"
        spacing={2}
      >
        <Grid item sm={8} xs={12}>
          <CardInfo />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Warning />
        </Grid>
      </Grid>
      <div className={classes.subTitle}>Выбрать SIM-карту для замены</div>
      <Grid container>
        <Grid item sm={8} xs={12}>
          <Form buttonBackHandler={buttonBackHandler}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Change;
