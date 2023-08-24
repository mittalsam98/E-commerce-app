import React from 'react';
import { Navigate } from 'react-router-dom';
import useLocalStorageLoginCheck from '../helpers/hooks/useLocalStorageLoginCheck';
import { useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atoms/userState';

type PrivateRouteProps = {
  component: React.ComponentType;
  isAdmin?: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: RouteComponent, isAdmin }) => {
  const isLoggedIn = useLocalStorageLoginCheck();
  const user = useRecoilValue(userState);

  const location = useLocation();

  if (isLoggedIn) {
    return location.pathname === '/login' ||
      location.pathname === '/register' ||
      (isAdmin && !user.isAdmin) ? (
      <Navigate to='/' />
    ) : (
      <RouteComponent />
    );
  }

  return location.pathname === '/login' || location.pathname === '/register' ? (
    <RouteComponent />
  ) : (
    <Navigate to='/' />
  );
};

export default PrivateRoute;
