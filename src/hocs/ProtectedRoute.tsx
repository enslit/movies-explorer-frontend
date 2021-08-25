import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import CurrentUserContext from '../context/CurrentUserContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  denyAuthUser?: boolean;
  [propName: string]: any;
};

const ProtectedRoute = ({
  denyAuthUser = false,
  children,
  ...props
}: ProtectedRouteProps) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (!denyAuthUser && currentUser._id) ||
    (denyAuthUser && !currentUser._id) ? (
    <Route exact {...props}>
      {children}
    </Route>
  ) : (
    <Redirect to={denyAuthUser ? '/' : '/signin'} exact />
  );
};

export default ProtectedRoute;
