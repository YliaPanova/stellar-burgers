import store, { RootState } from '../../store';

describe('rootReducer', () => {
  test('должен возвращать начальное состояние при неизвестном экшене', () => {
    const initialState = store.getState();

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('userOrders');

    expect(initialState.ingredients).toEqual({
      items: [],
      loading: false,
      error: null
    });
  });
});
