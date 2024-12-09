import { ingredientsReducer } from './ingredientsSlice';
import {
  fetchWithRefresh,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { error } from 'console';
import { deleteCookie, setCookie } from '../utils/cookie';
import { arch } from 'os';
import { access } from 'fs';

type TUserData = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

const initialState: TUserData = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const register = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgot',
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await forgotPasswordApi({ email });
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка при запросе на восстановление пароля');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/reset',
  async (
    { password, token }: { password: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await resetPasswordApi({ password, token });
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка при сбросе пароля');
    }
  }
);
export const update = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => {
    const data = await updateUserApi(user);
    return data;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserSelect: (state) => state.user,
    getLoading: (state) => state.loading,
    isAuthenticatedSelect: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.user = action.payload.user);
      })
      .addCase(getUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.error.message || 'Ошибка при получении данных пользователя');
      })
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.user = action.payload.user);
      })
      .addCase(register.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || 'Ошибка регистрации');
      })
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.user = action.payload.user);
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || 'Ошибка входа');
      })
      .addCase(forgotPassword.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.error.message || 'Ошибка при восстановлении пароля');
      })
      .addCase(resetPassword.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || 'Ошибка при сбросе пароля');
      })
      .addCase(update.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(update.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.user = action.payload.user);
      })
      .addCase(update.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.error.message || 'Ошибка при обновлении данных');
      })

      .addCase(logout.fulfilled, (state) => {
        (state.loading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      });
  }
});

export const userResucer = userSlice.reducer;
export const { getUserSelect, getLoading, isAuthenticatedSelect } =
  userSlice.selectors;
