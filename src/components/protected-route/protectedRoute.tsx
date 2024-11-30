import { Preloader } from '@ui';
import React from 'react';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'src/services/store';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;

// const location = useLocation();
// const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
// const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store

// if (!isAuthChecked) {
//   return <Preloader />;
// }

// if (!user) {
//   return <Navigate replace to='/login' />;
// }
