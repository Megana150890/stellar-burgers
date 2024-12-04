import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TConstructorState = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBunsandIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload; //если ингредиент -булка, то замеянем булку
        } else {
          state.ingredients.push(action.payload); //если не булка , то добавляем в массив ингредиентов
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    resetConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },

  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun
  }
});

export const { addBunsandIngredients, deleteIngredients, resetConstructor } =
  constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
export const { getIngredients, getBun } = constructorSlice.selectors;
