import userOrdersSlice, { fetchUserOrders } from '../userOrdersSlice';
import { TOrder } from '@utils-types';

jest.mock('../../../utils/burger-api', () => ({
  getOrdersApi: jest.fn()
}));

describe('userOrdersSlice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-01-01T12:00:00.000Z',
      updatedAt: '2024-01-01T12:00:00.000Z',
      number: 12345
    },
    {
      _id: '2',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0942'],
      status: 'pending',
      name: 'Люминесцентный бургер',
      createdAt: '2024-01-02T12:00:00.000Z',
      updatedAt: '2024-01-02T12:00:00.000Z',
      number: 12346
    }
  ];

  test('должен возвращать начальное состояние', () => {
    const state = userOrdersSlice(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('асинхронные экшены fetchUserOrders', () => {
    test('должен устанавливать loading в true при fetchUserOrders.pending', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = userOrdersSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен сохранять заказы и устанавливать loading в false при fetchUserOrders.fulfilled', () => {
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = userOrdersSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });

    test('должен устанавливать ошибку и loading в false при fetchUserOrders.rejected', () => {
      const errorMessage = 'Ошибка загрузки заказов';
      const action = {
        type: fetchUserOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = userOrdersSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
    });
  });
});
