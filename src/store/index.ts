import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import userReducer from "store/slices/user";
import tariffsReducer from "store/slices/tariffs";
import balanceReducer from "store/slices/balance";
import appReducer from "store/slices/app";
import bestOffersReducer from "store/slices/bestOffers";
import numbersReducer from "store/slices/numbers";
import servicesReducer from "store/slices/services";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tariffs: tariffsReducer,
    balance: balanceReducer,
    app: appReducer,
    bestOffers: bestOffersReducer,
    numbers: numbersReducer,
    services: servicesReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
