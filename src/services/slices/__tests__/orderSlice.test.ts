import orderSlice, { createOrder, clearOrder } from '../orderSlice';
import { TOrder } from '@utils-types';

jest.mock('../../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn()
}));

describe('orderSlice', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-01-01T12:00:00.000Z',
    number: 12345
  };

  test('должен возвращать начальное состояние', () => {
    const state = orderSlice(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('редьюсеры', () => {
    test('должен очищать заказ при clearOrder', () => {
      const stateWithOrder = {
        order: mockOrder,
        loading: false,
        error: null
      };

      const action = clearOrder();
      const state = orderSlice(stateWithOrder, action);

      expect(state.order).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe('асинхронные экшены createOrder', () => {
    const ingredientsIds = [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941'
    ];

    test('должен устанавливать loading в true при createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен сохранять заказ и устанавливать loading в false при createOrder.fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.order).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    test('должен устанавливать ошибку и loading в false при createOrder.rejected', () => {
      const errorMessage = 'Ошибка оформления заказа';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.order).toBeNull();
    });
  });
});
