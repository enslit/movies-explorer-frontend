import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ denyAuthUser, ...props }) => {
  const { isLoggedIn } = useAuth();

  console.log(props);

  return (!denyAuthUser && isLoggedIn) || (denyAuthUser && !isLoggedIn) ? (
    <Route exact {...props} />
  ) : (
    <Redirect to={denyAuthUser ? '/' : '/signin'} exact />
  );
};

ProtectedRoute.propTypes = {
  denyAuthUser: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  denyAuthUser: false,
};

export default ProtectedRoute;
