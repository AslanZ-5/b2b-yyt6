import { FC } from "react";
import Button from "@material-ui/core/Button";

import { AvailableTariff } from "../../hooks/useTariffs";
import { useStyles } from "./styles";

interface IProps {
  selectedTariff: AvailableTariff | null;
  onClick: () => void;
}

const CostBlock: FC<IProps> = ({ selectedTariff, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.costContainer}>
        <img src="/images/icons/ruble.svg" alt="" />
        <span className={classes.cost}>
          {selectedTariff?.subscriptionFee || selectedTariff?.subscriptionFee === 0
            ? `${selectedTariff?.subscriptionFee} ${selectedTariff?.unit}`
            : ""}
        </span>
      </div>
      <Button className={classes.btn} onClick={onClick}>
        Сменить
      </Button>
    </div>
  );
};

export default CostBlock;
