import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import CurrentUserContext from '../context/CurrentUserContext';

const ProtectedRoute = ({ denyAuthUser, children, ...props }) => {
  const { authorized } = useContext(CurrentUserContext);

  return (!denyAuthUser && authorized) || (denyAuthUser && !authorized) ? (
    <Route exact {...props}>
      {children}
    </Route>
  ) : (
    <Redirect to={denyAuthUser ? '/' : '/signin'} exact />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  denyAuthUser: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  denyAuthUser: false,
};

export default ProtectedRoute;
