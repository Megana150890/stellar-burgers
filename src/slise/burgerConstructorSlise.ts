import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TConstructorState = {
  ingredients: [] as TConstructorIngredient[],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBuns: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },
    addIngredients: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    deleteIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBuns: (state) => state.bun
  }
});

export const { addBuns, addIngredients, deleteIngredients } =
  constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
export const { getIngredients, getBuns } = constructorSlice.selectors;
