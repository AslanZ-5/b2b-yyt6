import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { DateRange } from "@material-ui/pickers-next";
import subDays from "date-fns/subDays";
import { getExpenses, getExpensesDetalization } from "api/expenses";

export interface Expenses {
  data: {
    services: [
      {
        total: number;
        total_sum: number;
        type: string;
        name: string;
        color: string;
        // in case of key === "internet"
        total_out?: number;
        total_in?: number;
      }
    ];
    charges_sum: number;
    pay_sum: number;
  } | null;
  loading: boolean;
}

interface ExpensesDetalization {
  data: Array<{
    type: string;
    name: string;
    img: string;
    date: string;
    description: string;
    dialed?: string;
    total_sum: string;
  }> | null;
  loading: boolean;
}

interface ExpensesState {
  expenses: Expenses;
  detalization: ExpensesDetalization;
  category: string;
  period: DateRange<Date | null>;
}

const initialState: ExpensesState = {
  expenses: {
    data: null,
    loading: false,
  },
  detalization: {
    data: null,
    loading: false,
  },
  category: "all",
  period: [subDays(new Date(), 7), new Date()],
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, { payload }: PayloadAction<Expenses["data"]>) => {
      state.expenses.data = payload;
    },
    setExpensesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.expenses.loading = payload;
    },
    setDetalization: (
      state,
      { payload }: PayloadAction<ExpensesDetalization["data"]>
    ) => {
      state.detalization.data = payload;
    },
    setDetalizationLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.detalization.loading = payload;
    },
    setCategory: (state, { payload }: PayloadAction<string>) => {
      state.category = payload;
    },
    setPeriod: (state, { payload }: PayloadAction<DateRange<Date | null>>) => {
      state.period = payload;
    },
  },
});

export const {
  setExpenses,
  setExpensesLoading,
  setDetalization,
  setDetalizationLoading,
  setCategory,
  setPeriod,
} = expensesSlice.actions;

export default expensesSlice.reducer;

export const getExpensesHandler =
  (
    startDate: string,
    endDate: string
  ): ThunkAction<void, ExpensesState, unknown, any> =>
  async (dispatch) => {
    dispatch(setExpensesLoading(true));

    try {
      const response = await getExpenses(startDate, endDate);

      dispatch(setExpenses(response.data));
      dispatch(setExpensesLoading(false));
    } catch (err) {
      dispatch(setExpensesLoading(false));
    }
  };

export const getExpensesDetalizationHandler = (
  startDate: string,
  endDate: string
): ThunkAction<void, ExpensesState, unknown, any> => {
  return async (dispatch) => {
    dispatch(setDetalizationLoading(true));
    try {
      const response = await getExpensesDetalization(startDate, endDate);
      dispatch(setDetalization(response.data));
      dispatch(setDetalizationLoading(false));
    } catch (err) {
      dispatch(setDetalizationLoading(false));
    }
  };
};
