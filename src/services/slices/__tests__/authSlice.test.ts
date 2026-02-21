import authSlice, {
  setUser,
  setAuthChecked,
  loginUser,
  checkUserAuth
} from '../authSlice';
import { TUser } from '@utils-types';

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
  getCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

jest.mock('../../../utils/burger-api', () => ({
  getUserApi: jest.fn(),
  loginUserApi: jest.fn()
}));

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false
  };

  const mockUser: TUser = {
    email: 'test@test.com',
    name: 'Test User'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('должен возвращать начальное состояние', () => {
    const state = authSlice(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('редьюсеры', () => {
    test('должен устанавливать пользователя при setUser', () => {
      const action = setUser(mockUser);
      const state = authSlice(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(false);
    });

    test('должен устанавливать null при setUser с null', () => {
      const action = setUser(null);
      const state = authSlice(initialState, action);

      expect(state.user).toBeNull();
    });

    test('должен устанавливать флаг isAuthChecked при setAuthChecked', () => {
      const action = setAuthChecked(true);
      const state = authSlice(initialState, action);

      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('loginUser', () => {
    test('должен устанавливать пользователя при loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = authSlice(initialState, action);

      expect(state.user).toEqual(mockUser);
    });
  });

  describe('checkUserAuth', () => {
    test('должен устанавливать isAuthChecked в true в finally', async () => {
      let state = authSlice(initialState, { type: checkUserAuth.pending.type });

      const action = { type: checkUserAuth.fulfilled.type, payload: mockUser };
      state = authSlice(state, action);
    });
  });
});
