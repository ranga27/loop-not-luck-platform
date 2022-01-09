/* eslint-disable react/no-children-prop */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
          <Redirect
            to={{
              pathname: '/unauthorized',
              state: { from: props.location },
            }}
          />
        );
      }
      return <Component {...props} />;
    }
    return (
      <Redirect
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
