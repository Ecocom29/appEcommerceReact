import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { delayedTimeout } from "../utilities/delayedTimeout";
import { httpParams } from "../utilities/httpParams";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (ThunkApi, { rejectWithValue }) => {
    try {
      await delayedTimeout(1000);
      return await axios.get(`/api/v1/product/list`);
    } catch (error) {
      return rejectWithValue(`Errores: ${error.message}`);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductId",
  async (id, { rejectWithValue }) => {
    try {
      await delayedTimeout(1000);
      return await axios.get(`/api/v1/product/${id}`);
    } catch (error) {
      return rejectWithValue(`Errores: ${error.message}`);
    }
  }
);

export const getProductPagination = createAsyncThunk(
  "products/getProductPagination",
  async (params, { rejectWithValue }) => {
    try {
      await delayedTimeout(1000);
      params = httpParams(params);
      const paramURL = new URLSearchParams(params).toString();

      var results = await axios.get(`/api/v1/product/pagination?${paramURL}`);

      return (await results).data;
    } catch (error) {
      return rejectWithValue(`Errores: ${error.message}`);
    }
  }
);
