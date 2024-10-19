import { createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../actions/productsAction";

//Data que se va almacenar del productos (global)
export const initialState = {
  product: null,
  loading: false,
  error: null,
};

export const productByIdSlice = createSlice({
  name: "productByIdSlice",
  initialState,
  reducers: {
    resetGetById: (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.product = payload.data;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { resetGetById } = productByIdSlice.actions;
export const productByIdReducer = productByIdSlice.reducer;
