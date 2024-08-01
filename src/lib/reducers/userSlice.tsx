import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../types";

const userSlice = createSlice({
  name: "User",
  initialState: {
    token: sessionStorage.getItem("s2n-token") || "",
    user: null,
    notifications: [],
    transactions: [],
    wallet: null,
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.wallet = action.payload.wallet;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const tokenSelector = (state: { user: { token: string } }) =>
  state.user.token;
export const userSelector = (state: { user: { user: TUser } }) =>
  state.user.user;
export const walletSelector = (state: { user: { wallet: TUser["wallet"] } }) =>
  state.user.wallet;

export const { setToken, setUser, setNotifications, setTransactions } =
  userSlice.actions;
export default userSlice.reducer;
