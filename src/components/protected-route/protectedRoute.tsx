import { Preloader } from '@ui';
import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserSelect, isAuthenticatedSelect } from '../../slise/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthenticatedSelect);
  const user = useSelector(getUserSelect);
  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  console.log('isAuthChecked:', isAuthChecked);

  return children;
};
