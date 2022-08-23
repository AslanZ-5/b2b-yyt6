import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Service } from "types/Service";

import { getServices } from "api/services";

// state
interface ServicesState {
  loading: boolean;
  data: Service[];
}

const initialState: ServicesState = {
  loading: false,
  data: [],
};

// reducer
export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Service[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// export
export const { setData, setLoading } = servicesSlice.actions;
export default servicesSlice.reducer;

// thunks
export const fetchServices = () => async (dispatch: any) => {
  try {
    const response: { data: Service[] } = await getServices();
    dispatch(setData(response?.data));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
