import { FC } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { format, parseISO } from "date-fns";
import { useAppSelector } from "store";
import { Remain } from "types/Remain";
import { useStyles } from "./styles";

interface IProps {
  balance: Remain;
}

const Card: FC<IProps> = ({ balance }) => {
  const classes = useStyles();
  const { appInfo } = useAppSelector((state) => state.app);
  const progressValue =
    +balance?.quota?.value !== -1
      ? Math.floor((+balance?.value / +balance?.quota?.value) * 100)
      : 100;
  const connectionType = appInfo?.categories?.units?.find(
    (el) => +el.id === +balance?.quota?.unit_id
  );

  return (
    <div className={classes.container}>
      <div className={classes.title}>{balance?.name || ""}</div>
      <div className={classes.date}>
        {`Действует до ${format(parseISO(balance?.expires), "dd.MM.yyyy")}`}
      </div>
      <LinearProgress
        className={classes.progress}
        variant="determinate"
        value={progressValue}
      />
      <div className={classes.footer}>
        {+balance?.quota.value !== -1 && (
          <div className={classes.value}>{`Осталось ${balance?.value} ${
            connectionType?.name || ""
          }`}</div>
        )}
        <div className={classes.value}>
          {+balance?.quota.value === -1
            ? "Безлимит"
            : `из ${+balance?.quota.value}`}
        </div>
      </div>
    </div>
  );
};

export default Card;
