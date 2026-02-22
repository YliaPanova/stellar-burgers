import store from '../../store';
import ingredientsSlice from '../ingredientsSlice';
import burgerConstructorSlice from '../burgerConstructorSlice';
import authSlice from '../authSlice';
import orderSlice from '../orderSlice';
import feedSlice from '../feedSlice';
import userOrdersSlice from '../userOrdersSlice';
import { combineReducers } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  test('должен возвращать начальное состояние при неизвестном экшене', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsSlice,
      burgerConstructor: burgerConstructorSlice,
      order: orderSlice,
      auth: authSlice,
      feed: feedSlice,
      userOrders: userOrdersSlice
    });

    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(undefined, unknownAction);

    expect(state.ingredients).toEqual({
      items: [],
      loading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state.order).toEqual({
      order: null,
      loading: false,
      error: null
    });

    expect(state.auth).toEqual({
      user: null,
      isAuthChecked: false
    });

    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null,
      wsConnected: false
    });

    expect(state.userOrders).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });
});
