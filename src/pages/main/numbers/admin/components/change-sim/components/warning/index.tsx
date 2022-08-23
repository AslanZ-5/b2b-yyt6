import { FC } from "react";
import { useStyles } from "./styles";

const Warning: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src="/images/icons/info.svg" alt="" />
        <span className={classes.title}>Внимание !</span>
      </div>
      <div className={classes.description}>
        После подтверждения отменить операцию будет невозможно!
      </div>
    </div>
  );
};

export default Warning;
