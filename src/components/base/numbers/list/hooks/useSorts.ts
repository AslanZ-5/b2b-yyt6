import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useAppSelector, useAppDispatch } from "store";
import * as _ from "lodash";

import { ColumnName, ColumnValue, ColumnState } from "../types/columns";
import { MsisdnNumber } from "types/MsisdnNumber";
import { setData } from "store/slices/numbers";

export type ReturnData = {
  sortedList: MsisdnNumber[] | null;
  setSortedList: Dispatch<SetStateAction<MsisdnNumber[] | null>>;
  columnStatus: ColumnState;
  columnHandler: (key: ColumnName) => void;
};

const initialColumn: ColumnValue = {
  active: false,
  order: "desc",
};

const initialState: ColumnState = {
  fio: initialColumn,
  msisdn: initialColumn,
  tariffName: initialColumn,
  account: initialColumn,
  icc: initialColumn,
  statId: initialColumn,
};

const useSorts = (): ReturnData => {
  const { list } = useAppSelector((state) => state.numbers);
  const dispatch = useAppDispatch();
  const [columnStatus, setColumnStatus] = useState<ColumnState>(initialState);
  const [sortedList, setSortedList] = useState<MsisdnNumber[] | null>(null);

  const columnHandler = useCallback(
    (key: ColumnName) => {
      setColumnStatus((prevColumnStatus) => {
        const currentSort =
          prevColumnStatus[key].order === "desc" ? "asc" : "desc";
        const newColumnStatus = {
          ...initialState,
          [key]: { active: true, order: currentSort },
        };

        dispatch(setData(_.orderBy(list, [key], [currentSort]) || []));

        return newColumnStatus;
      });
    },
    [dispatch, list]
  );

  return { columnStatus, columnHandler, sortedList, setSortedList };
};

export default useSorts;
