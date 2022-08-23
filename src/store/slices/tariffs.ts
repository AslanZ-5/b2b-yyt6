import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Tariff } from "types/Tariff";
import { getCurrentTariff, getTariffs } from "api/tariffs";

// state
interface TariffsState {
  current: {
    loading: boolean;
    data: Tariff | null;
  };
  list: {
    data: Tariff[];
    loading: boolean;
  };
}

const initialState: TariffsState = {
  current: {
    loading: true,
    data: null,
  },
  list: {
    loading: true,
    data: [],
  },
};

// reducer
export const tariffsSlice = createSlice({
  name: "tariffs",
  initialState,
  reducers: {
    setTariffsList: (state, action: PayloadAction<Tariff[]>) => {
      state.list.data = action.payload;
    },
    setTariffsListLoading: (state, action: PayloadAction<boolean>) => {
      state.list.loading = action.payload;
    },
    setCurrentTariff: (state, action: PayloadAction<Tariff>) => {
      state.current.data = action.payload;
    },
    setCurrentTariffLoading: (state, action: PayloadAction<boolean>) => {
      state.current.loading = action.payload;
    },
  },
});

// export
export const {
  setCurrentTariff,
  setCurrentTariffLoading,
  setTariffsList,
  setTariffsListLoading,
} = tariffsSlice.actions;
export default tariffsSlice.reducer;

// thunks
export const fetchCurrentTariff = () => async (dispatch: any) => {
  try {
    const response: { data: Tariff } = await getCurrentTariff();
    dispatch(setCurrentTariff(response?.data));
    dispatch(setCurrentTariffLoading(false));
  } catch (e) {
    dispatch(setCurrentTariffLoading(false));
  }
};

export const fetchTariffsList = () => async (dispatch: any) => {
  try {
    const response: { data: Tariff[] } = await getTariffs();
    dispatch(setTariffsList(response?.data));
    dispatch(setTariffsListLoading(false));
  } catch (e) {
    dispatch(setTariffsListLoading(false));
  }
};
