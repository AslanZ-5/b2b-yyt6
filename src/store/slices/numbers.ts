import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as _ from "lodash";

import { MsisdnNumber } from "types/MsisdnNumber";
import { getNumbers } from "api/numbers";

type MsisdnNumberResponse = {
  type: "phone";
  fio: string;
  tariffName: string;
  msisdn: string;
  account: string;
  icc: string;
  contractNumber: string;
  puk1: string;
  puk2: string;
  statId: "1" | "2" | "3" | "4" | "5";
  isBlocked: boolean;
};

// state
interface NumbersState {
  loading: boolean;
  list: MsisdnNumber[] | null;
  search: string;
  current: MsisdnNumber | null;
}

const initialState: NumbersState = {
  loading: true,
  list: null,
  search: "",
  current: null, //для деталки
};

// reducer
export const numbersSlice = createSlice({
  name: "msisdnNumbers",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setData: (state, action: PayloadAction<MsisdnNumber[] | null>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrent: (state, action: PayloadAction<MsisdnNumber | null>) => {
      state.current = action.payload;
    },
  },
});

// export
export const { setData, setLoading, setSearch, setCurrent } =
  numbersSlice.actions;
export default numbersSlice.reducer;

// thunks
export const fetchNumbers = () => async (dispatch: any, getState: any) => {
  try {
    const fetch = async () => {
      const response: { data: MsisdnNumberResponse[] } = await getNumbers();
      const {
        numbers: { list },
      }: { numbers: { list: MsisdnNumber[] } } = getState();
      const selectedNumbers: MsisdnNumber[] = list?.filter(
        (item) => item.checked
      );
      let formattedNumbers: MsisdnNumber[] = [];

      if (list?.length) {
        formattedNumbers = response?.data?.map((item) => ({
          ...item,
          msisdn: +item.msisdn,
          account: +item.account,
          checked: selectedNumbers?.find(
            (selectedNumber) => selectedNumber.msisdn === +item.msisdn
          )
            ? true
            : false,
        }));
      } else {
        formattedNumbers = response?.data?.map((item) => ({
          ...item,
          msisdn: +item.msisdn,
          account: +item.account,
          checked: false,
        }));
      }
      dispatch(setData(_.orderBy(formattedNumbers, ["msisdn"], ["asc"]) || []));
      dispatch(setLoading(false));
    };

    fetch();
    setInterval(fetch, 6 * 60000);
  } catch (e) {
    dispatch(setLoading(false));
  }
};
