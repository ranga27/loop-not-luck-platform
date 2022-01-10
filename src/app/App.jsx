/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from '../lang';
import ColorSwitcher from '../components/common/ColorSwitcher';
import {
  isMultiColorActive,
  adminRoot,
  UserRole,
} from '../constants/defaultValues';
import { getDirection } from '../helpers/Utils';
import { ProtectedRoute } from '../helpers/ProtectedRoute';

const AppRouter = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './AppRouter')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-unauthorized" */ '../views/unauthorized')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ '../views/user/login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ '../views/user/register')
);
const ForgotPassword = React.lazy(() =>
  import(
    /* webpackChunkName: "user-forgot-password" */ '../views/user/forgot-password'
  )
);
const ResetPassword = React.lazy(() =>
  import(
    /* webpackChunkName: "user-reset-password" */ '../views/user/reset-password'
  )
);
class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <BrowserRouter>
                <Routes>
                  {/* <ProtectedRoute
                    path={adminRoot}
                    component={AppRouter}
                    roles={[
                      UserRole.super,
                      UserRole.admin,
                      UserRole.editor,
                      UserRole.employer,
                      UserRole.candidate,
                    ]}
                  /> */}
                  <Route path="user" element={<ViewUser />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                      path="forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="reset-password" element={<ResetPassword />} />
                  </Route>
                  <Route path="/error" element={<ViewError />} />
                  <Route path="/unauthorized" element={<ViewUnauthorized />} />
                  <Route path="*" element={<ViewError />} />
                </Routes>
              </BrowserRouter>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
