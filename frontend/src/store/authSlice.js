import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.status = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.status = true;
      state.token = action.payload.token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.status = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = false;
    },
  },
});

export const {loginStart, loginFailure,loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;
