import { FC } from "react";
import Box from "@material-ui/core/Box";

import Button from "components/ui/Button";
import { useAppSelector } from "store";
import { getMsisdnStatus } from "helpers/getMsisdnStatus";

import { useStyles } from "./styles";

const defaultString = "Данные отсутствуют";

interface IProps {
  openChangeTariff: () => void;
  openBlockNumber: () => void;
}

const InfoBlocks: FC<IProps> = ({ openChangeTariff, openBlockNumber }) => {
  const classes = useStyles();

  const { list } = useAppSelector((state) => state.numbers);
  const currentNumber = list?.find((item) => item.checked);

  return (
    <>
      <div className={classes.infoBlockContainer}>
        <div className={classes.infoBlockRow}>
          <div className={classes.infoBlockLabel}>ФИО</div>
          <div className={classes.infoBlockValue}>
            {currentNumber?.fio || defaultString}
          </div>
        </div>
        <div className={classes.infoBlockRow}>
          <div className={classes.infoBlockLabel}>Номер абонента</div>
          <div className={classes.infoBlockValue}>
            {currentNumber?.msisdn
              ? `+7${currentNumber?.msisdn}`
              : defaultString}
          </div>
        </div>
      </div>
      <div className={classes.infoBlockContainer}>
        <div>
          <div className={classes.infoBlockRow}>
            <div className={classes.infoBlockLabel}>ЛС абонента</div>
            <div className={classes.infoBlockValue}>
              {currentNumber?.account || defaultString}
            </div>
          </div>
          <div className={classes.infoBlockRow}>
            <div className={classes.infoBlockLabel}>Контракт</div>
            <div className={classes.infoBlockValue}>
              {currentNumber?.contractNumber || defaultString}
            </div>
          </div>
        </div>
        <div className={classes.infoBlockRow}>
          <div className={classes.infoBlockLabel}>Тариф</div>
          <div className={classes.infoBlockValue}>
            {currentNumber?.tariffName || defaultString}
          </div>
        </div>
        <Box width="100%" pl="47%">
          <Button onClick={openChangeTariff} text="Сменить" />
        </Box>
      </div>
      <div className={classes.infoBlockContainer}>
        <div>
          <div className={classes.infoBlockRow}>
            <div className={classes.infoBlockLabel}>ICC</div>
            <div className={classes.infoBlockValue}>
              {currentNumber?.icc || defaultString}
            </div>
          </div>
          <div className={classes.infoBlockRow}>
            <div className={classes.infoBlockLabel}>PUK1</div>
            <div className={classes.infoBlockValue}>
              {currentNumber?.puk1 || defaultString}
            </div>
          </div>
          <div className={classes.infoBlockRow}>
            <div className={classes.infoBlockLabel}>PUK2</div>
            <div className={classes.infoBlockValue}>
              {currentNumber?.puk2 || defaultString}
            </div>
          </div>
        </div>
        <div className={classes.infoBlockRow}>
          <div className={classes.infoBlockLabel}>Статус блокировки</div>
          <div className={classes.infoBlockStatusValue}>{getMsisdnStatus(currentNumber?.statId || "")}</div>
        </div>
        <Box width="100%" pl="47%">
          <Button
            onClick={openBlockNumber}
            text={currentNumber?.isBlocked ? "Разблокировать" : "Заблокировать"}
            additionalClasses={{ width: "120px" }}
          />        
        </Box>
      </div>
    </>
  );
};

export default InfoBlocks;
