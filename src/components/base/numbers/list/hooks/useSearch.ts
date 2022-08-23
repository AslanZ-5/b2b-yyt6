import { useCallback, Dispatch, SetStateAction, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "store";
import { setSearch } from "store/slices/numbers";
import { MsisdnNumber } from "types/MsisdnNumber";

type Props = {
  setSortedList: Dispatch<SetStateAction<MsisdnNumber[] | null>>;
};

const useSearch = ({ setSortedList }: Props) => {
  const dispatch = useAppDispatch();

  const { search: searchValue, list } = useAppSelector(
    (state) => state.numbers
  );

  const filterList = useCallback(() => {
    setSortedList(
      list?.filter((itemList) => {
        return (
          itemList.fio.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
          itemList.msisdn.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
          `7${itemList.msisdn}`.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
          `+7${itemList.msisdn}`.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
          `8${itemList.msisdn}`.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
          itemList.account.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
          itemList.icc.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
          itemList.tariffName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        );
      }) || null
    );
  }, [list, searchValue, setSortedList]);

  const executeSearch = useCallback(() => {
    filterList();
  }, [filterList]);

  const setSearchValue = useCallback(
    (newValue: string) => {
      dispatch(setSearch(newValue));
    },
    [dispatch]
  );

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  return { searchValue, setSearchValue, executeSearch };
};

export default useSearch;
