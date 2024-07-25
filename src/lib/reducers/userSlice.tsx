import { getCookie } from "@/utils/functions";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    token: "" || getCookie("token"),
    user: null,
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;

export const tokenSelector = (state: { user: { token: string } }) =>
  state.user.token;
export default userSlice.reducer;
