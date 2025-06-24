import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
