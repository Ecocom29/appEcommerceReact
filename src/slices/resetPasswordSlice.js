import { createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../actions/userAction";

//Data que se va almacenar del productos (global)
export const initialState = {
  message: null,
  errores: null,
  loading: false,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.errores = null;
      state.message = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.message = null;
        state.errores = null;
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.message = payload;
        state.errores = null;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.message = null;
        state.errores = action.payload;
        state.loading = false;
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { resetError } = resetPasswordSlice.actions;
export const resetPasswordReducer = resetPasswordSlice.reducer;
