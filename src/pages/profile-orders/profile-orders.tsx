import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedSelect } from '../../slise/feedSlice';
import { orderSlice } from '../../slise/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const orders: TOrder[] = useSelector(getFeedSelect);

  return <ProfileOrdersUI orders={orders} />;
};
