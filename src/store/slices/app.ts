import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAppInfo } from "api/app";

// state
interface IAppInfoResponse {
  general: {
    payment_url: string;
  };
  categories: {
    units: Array<{ id: number; name: string }>;
    services_categories: Array<{ id: number; name: string }>;
    faq_categories: Array<{ id: number; name: string }>;
  };
}

interface AppState {
  loading: boolean;
  appInfo: IAppInfoResponse | null;
}

const initialState: AppState = {
  loading: false,
  appInfo: null,
};

// reducer
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IAppInfoResponse>) => {
      state.appInfo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// export
export const { setData, setLoading } = appSlice.actions;
export default appSlice.reducer;

// thunks
export const fetchAppInfo = () => async (dispatch: any) => {
  try {
    const response: { data: IAppInfoResponse } = await getAppInfo();
    dispatch(setData(response?.data));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
