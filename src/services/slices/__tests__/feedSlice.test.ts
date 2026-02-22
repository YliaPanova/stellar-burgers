import feedSlice, {
  fetchFeeds,
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from '../feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null,
    wsConnected: false
  };

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Burger',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 12345
  };

  const mockOrdersData: TOrdersData = {
    orders: [mockOrder],
    total: 100,
    totalToday: 10
  };

  test('должен возвращать начальное состояние', () => {
    const state = feedSlice(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('редьюсеры WebSocket', () => {
    test('должен обрабатывать wsConnectionStart', () => {
      const action = wsConnectionStart();
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.wsConnected).toBe(false);
    });

    test('должен обрабатывать wsConnectionSuccess', () => {
      const action = wsConnectionSuccess();
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.wsConnected).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен обрабатывать wsConnectionError', () => {
      const errorMessage = 'WebSocket error';
      const action = wsConnectionError(errorMessage);
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.wsConnected).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    test('должен обрабатывать wsConnectionClosed', () => {
      const action = wsConnectionClosed();
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.wsConnected).toBe(false);
    });

    test('должен обрабатывать wsGetMessage', () => {
      const action = wsGetMessage(mockOrdersData);
      const state = feedSlice(initialState, action);

      expect(state.orders).toEqual(mockOrdersData.orders);
      expect(state.total).toBe(mockOrdersData.total);
      expect(state.totalToday).toBe(mockOrdersData.totalToday);
    });
  });

  describe('асинхронные экшены fetchFeeds', () => {
    test('должен устанавливать loading в true при fetchFeeds.pending', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен заполнять данные при fetchFeeds.fulfilled', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: mockOrdersData
      };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrdersData.orders);
      expect(state.total).toBe(mockOrdersData.total);
      expect(state.totalToday).toBe(mockOrdersData.totalToday);
    });

    test('должен устанавливать ошибку при fetchFeeds.rejected', () => {
      const errorMessage = 'Ошибка загрузки';
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
    });
  });
});
