import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from '../slise/ingredientsSlice';
import { constructorReducer } from '../slise/burgerConstructorSlise';
import { orderReducer } from '../slise/orderSlice';
import { feedReducer } from '../slise/feedSlice';
import { userResucer } from '../slise/userSlice';
import { allOrderReducer } from '../slise/allOrdersSlice';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера
const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userResucer,
  orders: allOrderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
