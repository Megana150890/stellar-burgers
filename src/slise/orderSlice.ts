import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { orderBurgerApi } from '@api';

export const newOrder = createAsyncThunk('order/newOrder', orderBurgerApi);

type TOrderState = {
  loading: boolean;
  order: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  loading: false,
  order: null,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.loading,
    getOrderModalData: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        (state.loading = false), (state.order = action.payload.order);
      })
      .addCase(newOrder.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || 'Failed to get order');
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { getOrderRequest, getOrderModalData } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
