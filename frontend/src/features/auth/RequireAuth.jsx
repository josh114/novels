import React from 'react';
import { selectCurrentToken } from './authSlice';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  // console.log(token);
  const location = useLocation();
  let content;
  if (token) {
    content = <Outlet />;
  } else {
    content = <Navigate to='/admin' state={{ from: location }} replace />;
  }

  return content;
};

export default RequireAuth;
