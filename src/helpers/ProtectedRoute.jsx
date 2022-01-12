/* eslint-disable react/no-children-prop */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Decides what routes to render for what roles
const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const { currentUser } = useSelector((state) => state.authUser);

  const children = (props) => {
    if (currentUser) {
      if (roles) {
        if (roles.includes(currentUser.role)) {
          return <Component {...props} />;
        }
        return (
          <Navigate
            to={{
              pathname: '/unauthorised',
              state: { from: props.location },
            }}
          />
        );
      }
      return <Component {...props} />;
    }
    return (
      <Navigate
        to={{
          pathname: '/user/login',
          state: { from: props.location },
        }}
      />
    );
  };

  return <Route {...rest} children={children} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
