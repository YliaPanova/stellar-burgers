import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder, TOrdersData } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
  wsConnected: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
  wsConnected: false
};

export const fetchFeeds = createAsyncThunk('feed/fetchAll', async () => {
  const data = await getFeedsApi();
  return data;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnectionStart: (state) => {
      state.loading = true;
      state.wsConnected = false;
    },
    wsConnectionSuccess: (state) => {
      state.loading = false;
      state.wsConnected = true;
      state.error = null;
    },
    wsConnectionError: (state, action) => {
      state.loading = false;
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsConnectionClosed: (state) => {
      state.loading = false;
      state.wsConnected = false;
    },
    wsGetMessage: (state, action: { payload: TOrdersData }) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      });
  }
});

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} = feedSlice.actions;

export default feedSlice.reducer;
