import { error } from 'console';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export type feedState = {
  loading: boolean;
  orders: TOrder[];
  error: string | null;
  total: number;
  totalToday: number;
};

const initialState: feedState = {
  loading: false,
  orders: [],
  error: null as string | null,
  total: 0,
  totalToday: 0
};

export const getFeed = createAsyncThunk('orders/getFeed', getFeedsApi);
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedLoading: (state) => state.loading,
    getFeedSelect: (state) => state.orders,
    getAllTotal: (state) => state.total,
    getTodayTotal: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getFeed.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.error.message || 'Ошибка в получении ленты заказов');
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        (state.loading = false),
          (state.orders = action.payload.orders),
          (state.total = action.payload.total),
          (state.totalToday = action.payload.totalToday);
      });
  }
});
export const feedReducer = feedSlice.reducer;
export const { getFeedLoading, getFeedSelect, getAllTotal, getTodayTotal } =
  feedSlice.selectors;
