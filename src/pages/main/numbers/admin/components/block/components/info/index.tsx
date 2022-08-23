import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";

const Info: FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.container}
    >
      <div className={classes.title}>Добровольная блокировка</div>
      <div className={classes.description}>
        Если отказываетесь от пользования телефоном надолго, установите
        добровольную блокировку. Отменить блокировку можно в Виртуальном
        менеджере.
      </div>
      {/*<div className={classes.link}>Перейти к описанию на сайте</div>*/}
    </Grid>
  );
};

export default Info;
