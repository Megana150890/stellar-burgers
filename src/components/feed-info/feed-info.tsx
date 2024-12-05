import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  getAllTotal,
  getFeedSelect,
  getTodayTotal
} from '../../slise/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders = useSelector(getFeedSelect);
  const total = useSelector(getAllTotal);
  const totalToday = useSelector(getTodayTotal);
  const feed = {
    total: total,
    totalToday: totalToday
  };

  // console.log('Orders:', orders);

  // console.log('Pending Orders:', getOrders(orders, 'pending'));

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');
  // console.log('Props to FeedInfoUI:', {
  //   readyOrders,
  //   pendingOrders,
  //   feed
  // });
  console.log('Pending orders:', pendingOrders);
  console.log('Ready orders:', readyOrders);
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
