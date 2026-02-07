import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUserApi, loginUserApi } from '../../utils/burger-api';
import { setCookie, getCookie } from '../../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false
};

export const checkUserAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = getCookie('accessToken');

      if (!accessToken) {
        return rejectWithValue('Токен не найден');
      }

      const response = await getUserApi();
      if (response.success) {
        dispatch(setUser(response.user));
        return response.user;
      }
    } catch (error: any) {
      // Если ошибка 403 или 401, удаляем токены
      if (error.message.includes('403') || error.message.includes('401')) {
        setCookie('accessToken', '', { expires: -1 });
        localStorage.removeItem('refreshToken');
      }

      dispatch(setUser(null));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);

// Логин
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUserApi({ email, password });
    if (response.success) {
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user;
    }
    throw new Error('Ошибка авторизации');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  }
});

export const { setUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
