import { allOrderReducer } from '../src/slise/allOrdersSlice';
import { constructorReducer } from '../src/slise/burgerConstructorSlise';
import { feedReducer } from '../src/slise/feedSlice';
import { ingredientsReducer } from '../src/slise/ingredientsSlice';
import { orderReducer } from '../src/slise/orderSlice';
import { userResucer } from '../src/slise/userSlice';
import { TIngredient } from '../src/utils/types';
import { rootReducer } from './../src/services/store';

describe('rootReducer', () => {
  it('должен корректно инициализировать неачальное состояние', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual({
      ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      burgerConstructor: constructorReducer(undefined, { type: '@@INIT' }),
      order: orderReducer(undefined, { type: '@@INIT' }),
      feed: feedReducer(undefined, { type: '@@INIT' }),
      user: userResucer(undefined, { type: '@@INIT' }),
      orders: allOrderReducer(undefined, { type: '@@INIT' })
    });
  });
  it('возвращает начальное состояние при неизвемтном действии', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual({
      ingredients: {
        ingredients: [] as TIngredient[],
        loading: false,
        error: null as string | null
      },
      burgerConstructor: {
        ingredients: [],
        bun: null
      },
      order: {
        loading: false,
        order: null,
        error: null
      },
      feed: {
        loading: false,
        orders: [],
        error: null as string | null,
        total: 0,
        totalToday: 0
      },
      user: {
        loading: false,
        error: null,
        isAuthenticated: false,
        user: null,
        isAuthChecked: false
      },
      orders: {
        orders: [],
        orderByNumber: null,
        error: null,
        loading: false
      }
    });
  });
});
