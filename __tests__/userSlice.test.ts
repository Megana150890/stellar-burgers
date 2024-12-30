import {
  forgotPassword,
  getUser,
  login,
  logout,
  register,
  TUserData,
  update,
  userResucer
} from '../src/slise/userSlice';

describe('проверяют редьюсер слайса user', () => {
  let initialState: TUserData;
  const mockName = {
    user: {
      email: 'Megana150890@gmail.com',
      name: 'Юлия'
    }
  };

  const updateMockName = {
    user: {
      email: 'newemail@gmail.com',
      name: 'Юлия Анатольевна'
    }
  };

  beforeEach(() => {
    initialState = {
      loading: false,
      error: null,
      isAuthenticated: false,
      user: null,
      isAuthChecked: false
    };
  });

  test('обработка экшена getUser.pending', () => {
    const state = userResucer(initialState, { type: getUser.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });
  test('обработка экшена getUser.fulfilled', () => {
    const state = userResucer(initialState, {
      type: getUser.fulfilled.type,
      payload: mockName
    });
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockName.user);
  });
  test('обработка экшена getUser.rejected', () => {
    const mockError = 'Ошибка при получении данных пользователя';
    const state = userResucer(initialState, { type: getUser.rejected.type });
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(mockError);
  });

  test('обработка экшена register.pending', () => {
    const state = userResucer(initialState, { type: register.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('обработка экшена register.fulfilled', () => {
    const state = userResucer(initialState, {
      type: register.fulfilled.type,
      payload: mockName
    });
    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockName.user);
  });

  test('обработка экшена register.rejected', () => {
    const mockError = 'Ошибка регистрации';
    const state = userResucer(initialState, { type: register.rejected.type });
    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe(mockError);
  });

  test('обработка экшена login.pending', () => {
    const state = userResucer(initialState, { type: login.pending.type });
    expect(state.loading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe(null);
  });

  test('обработка экшена login.fulfilled', () => {
    const state = userResucer(initialState, {
      type: login.fulfilled.type,
      payload: mockName
    });
    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockName.user);
  });

  test('обработка экшена login.rejected', () => {
    const mockError = 'Ошибка входа';
    const state = userResucer(initialState, { type: login.rejected.type });
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe(mockError);
  });

  test('обработка экшена update.pending', () => {
    const state = userResucer(initialState, { type: update.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('обработка экшена update.fulfilled', () => {
    const state = userResucer(initialState, {
      type: update.fulfilled.type,
      payload: updateMockName
    });
    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(updateMockName.user);
  });
  test('обработка экшена update.rejected', () => {
    const mockError = 'Ошибка при обновлении данных';
    const state = userResucer(initialState, { type: update.rejected.type });
    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe(mockError);
  });

  test('обработка экшена logout.fulfilled', () => {
    const state = userResucer(initialState, { type: logout.fulfilled.type });
    expect(state.loading).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
  });

  test('обработка экшена logout.rejected', () => {
    const mockError = 'Ошибка выхода';
    const state = userResucer(initialState, { type: logout.rejected.type });
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe(mockError);
  });
});
