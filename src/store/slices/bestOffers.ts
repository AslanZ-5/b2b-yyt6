import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BestOffer } from "types/BestOffer";
import { getBestOffers } from "api/best-offers";

// state
interface BestOffersState {
  loading: boolean;
  data: BestOffer[] | null;
}

const initialState: BestOffersState = {
  loading: false,
  data: null,
};

// reducer
export const bestOffersSlice = createSlice({
  name: "bestOffers",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<BestOffer[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// export
export const { setData, setLoading } = bestOffersSlice.actions;
export default bestOffersSlice.reducer;

// thunks
export const fetchBestOffers = () => async (dispatch: any) => {
  try {
    const response: { data: BestOffer[] } = await getBestOffers();
    dispatch(setData(response?.data));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
