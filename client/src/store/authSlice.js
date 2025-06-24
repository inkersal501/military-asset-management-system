import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: localStorage.getItem("isLoggedin") || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.user = action.payload;
      localStorage.setItem("isLoggedin", state.isLoggedin);
      localStorage.setItem("user", action.payload);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = null;
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
