import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  addBunsandIngredients,
  getBun,
  getIngredients,
  resetConstructor
} from '../../slise/burgerConstructorSlise';
import { useDispatch } from '../../services/store';
import {
  getOrderModalData,
  getOrderRequest,
  newOrder
} from '../../slise/orderSlice';
import { clearOrder } from '../../slise/orderSlice';
import { isAuthenticatedSelect } from '../../slise/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };
  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);
  const user = useSelector(isAuthenticatedSelect);
  const navigate = useNavigate();
  console.log('Ingredients:', ingredients);
  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };
  console.log('constructorItems:', constructorItems);

  // const orderRequest = false; //стутас отправики заказа

  // const orderModalData = null; //данные для модального окна

  const orderRequest = useSelector(getOrderRequest); //стутас отправики заказа

  const orderModalData = useSelector(getOrderModalData); //данные для модального окн

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const data = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id)
      ];
      dispatch(newOrder(data)); // обработчкие клика на кнопку отправления заказа
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder()), dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
// function clearOrder(): any {
//   throw new Error('Function not implemented.');
// }
