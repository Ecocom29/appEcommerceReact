import { createSlice } from "@reduxjs/toolkit";
import { getCountries } from "../actions/countryAction";

export const initialState = {
  countries: [],
  loading: false,
  error: null,
};

export const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.countries = payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const countryReducer = countrySlice.reducer;
