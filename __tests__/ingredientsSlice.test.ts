import { error } from 'console';
//Написаны тесты, проверяющие обработку редьюсером экшенов генерируемых при
// выполнении асинхронного запроса: экшены начала запроса, успешного выполнения запроса и ошибки запроса.

import {
  getIngredientsList,
  ingredientsReducer,
  TIngredientState
} from '../src/slise/ingredientsSlice';
import { TIngredient } from '../src/utils/types';

describe('Проверяют редьюсер слайса ingredients', () => {
  let initialState: TIngredientState;
  beforeEach(() => {
    initialState = {
      ingredients: [] as TIngredient[],
      loading: false,
      error: null as string | null
    };
  });

  test('обработка экшена getIngredientsList.pending', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredientsList.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });
  test('обработка экшена getIngredientsList.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0948',
        name: 'Кристаллы марсианских альфа-сахаридов',
        type: 'main',
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
        __v: 0
      }
    ];
    const state = ingredientsReducer(initialState, {
      type: getIngredientsList.fulfilled.type,
      payload: mockIngredients
    });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('обработка экшена getIngredientsList.rejected', () => {
    const mockError = 'Failed to get ingredients';
    const state = ingredientsReducer(initialState, {
      type: getIngredientsList.rejected.type,
      error: { message: mockError }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
