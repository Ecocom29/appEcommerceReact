import { createSlice } from "@reduxjs/toolkit";
import {
  loadUser,
  login,
  register,
  update,
  updatePassword,
} from "../actions/userAction";
import { saveAddressInfo } from "../actions/cartAction";

const initialState = {
  loading: false,
  errores: [],
  isAuthenticated: false,
  user: null,
  isUpdated: false,
  direccionEnvio: null,
};

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.errores = [];
      state.loading = null;
      state.direccionEnvio = null;
    },
    resetUpdateStatus: (state, action) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errores = [];
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.errores = [];
        state.isAuthenticated = true;
        state.direccionEnvio = payload.direccionEnvio;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errores = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.errores = [];
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.errores = [];
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errores = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(update.pending, (state) => {
        state.loading = true;
        state.errores = [];
      })
      .addCase(update.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.errores = [];
        state.isAuthenticated = true;
        state.isUpdated = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.errores = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.errores = [];
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.errores = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.errores = [];
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.errores = [];
        state.isAuthenticated = true;
        state.direccionEnvio = payload.direccionEnvio;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.errores = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(saveAddressInfo.pending, (state) => {
        state.loading = true;
        state.errores = [];
      })
      .addCase(saveAddressInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isUpdated = true;
        state.user = payload;
        state.errores = [];
        state.direccionEnvio = payload;
      })
      .addCase(saveAddressInfo.rejected, (state, action) => {
        state.loading = false;
        state.errores = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout, resetUpdateStatus } = securitySlice.actions;

export const securityReducer = securitySlice.reducer;
