import { createSlice } from "@reduxjs/toolkit";
import { forgotSendPassword } from "../actions/userAction";

//Data que se va almacenar del productos (global)
export const initialState = {
  message: null,
  loading: false,
  error: null,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotSendPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotSendPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.message = payload;
      })
      .addCase(forgotSendPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { resetError } = forgotPasswordSlice.actions;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
