import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { getBuns, getIngredients } from '../../slise/burgerConstructorSlise';
import { useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const bun = useSelector(getBuns);
  const ingredients = useSelector(getIngredients);
  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };
  const orderRequest = false; //стутас отправики заказа

  const orderModalData = null; //данные для модального окна

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return; // обработчкие клика на кнопку отправления заказа
  };
  const closeOrderModal = () => {};

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
