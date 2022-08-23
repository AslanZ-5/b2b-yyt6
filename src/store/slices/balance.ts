import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Remain } from "types/Remain";
import { getBalance } from "api/balance";

// state
interface IBalanceResponse {
  balance: number;
  at: string;
  monthly_charges: number;
  monthly_write_offs: number;
  remains: Remain[];
}

interface BalanceState {
  loading: boolean;
  data: IBalanceResponse | null;
}

const initialState: BalanceState = {
  loading: false,
  data: null,
};

// reducer
export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IBalanceResponse>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// export
export const { setData, setLoading } = balanceSlice.actions;
export default balanceSlice.reducer;

// thunks
export const fetchBalance = () => async (dispatch: any) => {
  try {
    const response: { data: IBalanceResponse } = await getBalance();
    dispatch(setData(response?.data));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
