import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders, getAllOrdersSelector } from '../../slise/allOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const orders = useSelector(getAllOrdersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  });

  return <ProfileOrdersUI orders={orders} />;
};
