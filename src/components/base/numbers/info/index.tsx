import { FC, useEffect, useState, useMemo } from "react";
import { useAppSelector } from "store";
import { useStyles } from "./style";

const NumbersInfo: FC = () => {
  const classes = useStyles();
  const { list } = useAppSelector((state) => state.numbers);
  const [counts, setCounts] = useState<{
    numbers: number;
    accounts: number;
    contracts: number;
  }>({ numbers: 0, accounts: 0, contracts: 0 });

  const selectedNumbers = useMemo(
    () => list?.filter((selectedNumber) => selectedNumber.checked) || [],
    [list]
  );
  useEffect(() => {
    const numbers = selectedNumbers?.length || 0;
    const accounts =
      selectedNumbers?.reduce(
        (individualAccountsArray: number[], currentNumber) => {
          return individualAccountsArray.find(
            (individualNumber) => individualNumber === currentNumber.account
          )
            ? individualAccountsArray
            : [...individualAccountsArray, currentNumber.account];
        },
        []
      )?.length || 0;
    const contracts = 1;
    setCounts({ numbers, accounts, contracts });
  }, [list, selectedNumbers]);

  return (
    <div className={classes.text}>
      <span>Выбрано: </span>
      <span>
        <span className={classes.value}>{counts.numbers}</span> номеров,{" "}
      </span>
      <span>
        <span className={classes.value}>{counts.accounts}</span> ЛС,{" "}
      </span>
      <span>
        <span className={classes.value}>
          {selectedNumbers?.length ? counts.contracts : 0}
        </span>{" "}
        контракт{" "}
      </span>
    </div>
  );
};

export default NumbersInfo;
