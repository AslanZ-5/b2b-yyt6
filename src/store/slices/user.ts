import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getUser, getEntityUser } from "api/user";
import { User, EntityUser } from "types/User";
import { getUserAccountsFromLocaleStorage } from "helpers/getUserAccountsFromLocaleStorage";

// state
interface UserState {
  user: User | null;
  accounts: User[];
  loading: boolean;
  error: boolean;
}

export const initialState: UserState = {
  user: null,
  accounts: [],
  loading: true,
  error: false,
};

// reducer
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
        ? { ...action.payload}
        : null;
    },
    setAccounts: (state, action: PayloadAction<User[]>) => {
      state.accounts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

// export
export const { setUser, setAccounts, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;

// thunks
export const fetchUser =
  (token: string, refresh_token: string) => async (dispatch: any) => {
    try {
      const response: { data: User } = await getUser(token);
      const entityResponse: { data: EntityUser } = await getEntityUser(token);
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
      const user = {
        ...response?.data,
        ...entityResponse?.data,
        token,
        refresh_token,
      };
      dispatch(setUser(user));
      dispatch(setAccounts(getUserAccountsFromLocaleStorage(user)));
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setError(true));
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
    }
  };
