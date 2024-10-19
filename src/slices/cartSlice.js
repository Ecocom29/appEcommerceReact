import { createSlice } from "@reduxjs/toolkit";
import {
  addItemShoppingCart,
  getShoppingCart,
  removeItemShoppingCart,
} from "../actions/cartAction";
import { confirmPayment } from "../actions/orderAction";

export const initialState = {
  shoppingCartId: "",
  shoppingCartItems: [],
  loading: false,
  error: null,
  total: 0,
  cantidad: 0,
  subtotal: 0,
  impuesto: 0,
  precioEnvio: 0,
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShoppingCart.fulfilled, (state, { payload }) => {
        localStorage.setItem("shoppingCartId", payload.shoppingCartId);
        state.shoppingCartId = payload.shoppingCartId;
        state.shoppingCartItems = payload.shoppingCartItems ?? [];
        state.total = payload.total;
        state.cantidad = payload.cantidad;
        state.subtotal = payload.subtotal;
        state.impuesto = payload.impuesto;
        state.precioEnvio = payload.precioEnvio;
        state.loading = false;
        state.error = null;
      })
      .addCase(getShoppingCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addItemShoppingCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemShoppingCart.fulfilled, (state, { payload }) => {
        state.shoppingCartId = payload.shoppingCartId;
        state.shoppingCartItems = payload.shoppingCartItems ?? [];
        state.loading = false;
        state.error = null;
        state.total = payload.total;
        state.cantidad = payload.cantidad;
        state.subtotal = payload.subtotal;
        state.impuesto = payload.impuesto;
        state.precioEnvio = payload.precioEnvio;
      })
      .addCase(addItemShoppingCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeItemShoppingCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemShoppingCart.fulfilled, (state, { payload }) => {
        state.shoppingCartId = payload.shoppingCartId;
        state.shoppingCartItems = payload.shoppingCartItems ?? [];
        state.total = payload.total;
        state.cantidad = payload.cantidad;
        state.subtotal = payload.subtotal;
        state.impuesto = payload.impuesto;
        state.precioEnvio = payload.precioEnvio;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeItemShoppingCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmPayment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        //state.shoppingCartId =
        state.shoppingCartItems = [];
        state.loading = false;
        state.error = null;
        state.total = 0;
        state.cantidad = 0;
        state.subtotal = 0;
        state.impuesto = 0;
        state.precioEnvio = 0;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const cartReducer = cartSlice.reducer;
