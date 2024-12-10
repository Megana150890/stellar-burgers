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
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredient = state.ingredients[from];
      state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, ingredient);
    },

    resetConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },

  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
    getBurgerSelect: (state) => state
  }
});

export const {
  addBunsandIngredients,
  deleteIngredients,
  resetConstructor,
  moveIngredient
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
export const { getIngredients, getBun, getBurgerSelect } =
  constructorSlice.selectors;
