import {
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
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { error } from 'console';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
type TUserData = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
};

const initialState: TUserData = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  isAuthChecked: false
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
  async (email: string) => {
    const data = await forgotPasswordApi({ email });
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  'user/reset',
  async ({ password, token }: { password: string; token: string }) => {
    const data = await resetPasswordApi({ password, token });
    return data;
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
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        (state.loading = true),
          (state.error = null),
          (state.isAuthenticated = false);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
          (state.isAuthenticated = true), (state.isAuthChecked = true);
        } else {
          state.user = null;
          // state.isAuthenticated = false;
        }
        state.loading = false;
      })

      .addCase(getUser.rejected, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = false),
          (state.error =
            action.error?.message ||
            'Ошибка при получении данных пользователя'),
          (state.isAuthChecked = true);
      })
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.user = action.payload.user),
          (state.isAuthChecked = true);
      })
      .addCase(register.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error?.message || 'Ошибка регистрации'),
          (state.isAuthChecked = true);
      })
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.isAuthenticated = false);
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.user = action.payload.user),
          (state.error = null),
          (state.isAuthChecked = true);
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = false),
          (state.error = action.error?.message || 'Ошибка входа'),
          (state.isAuthChecked = true);
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
            action.error?.message || 'Ошибка при восстановлении пароля');
      })
      .addCase(resetPassword.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error?.message || 'Ошибка при сбросе пароля');
      })
      .addCase(update.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(update.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.isAuthChecked = true),
          (state.user = action.payload.user);
      })
      .addCase(update.rejected, (state, action) => {
        (state.loading = false),
          (state.isAuthChecked = true),
          (state.error =
            action.error?.message || 'Ошибка при обновлении данных');
      })

      .addCase(logout.fulfilled, (state) => {
        (state.loading = false),
          (state.user = null),
          (state.isAuthChecked = true),
          (state.isAuthenticated = false);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = action.error.message || 'Ошибка выхода';
      });
  },
  selectors: {
    getUserSelect: (state) => state.user,
    getLoading: (state) => state.loading,
    isAuthenticatedSelect: (state) => state.isAuthenticated,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  }
});

export const userResucer = userSlice.reducer;
export const {
  getUserSelect,
  getLoading,
  isAuthenticatedSelect,
  isAuthCheckedSelector
} = userSlice.selectors;
