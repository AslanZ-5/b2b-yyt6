import { FC } from "react";

import Button from "@material-ui/core/Button";

import { Service } from "../../hooks/useServices";

import { useStyles } from "./styles";
import { ActionType } from "../../types/ActionType";

interface IProps {
  selectedService: Service | null;
  onClick: () => void;
  type: ActionType;
}

const CostBlock: FC<IProps> = ({ selectedService, onClick, type }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.costContainer}>
        <img src="/images/icons/ruble.svg" alt="" />
        <span className={classes.cost}>
          {selectedService?.price || selectedService?.price === 0
            ? `${selectedService?.price} руб./ месяц`
            : ""}
        </span>
      </div>
      <Button className={classes.btn} onClick={onClick}>
        {type === "connection" ? "Подключить" : "Отключить"}
      </Button>
    </div>
  );
};

export default CostBlock;
