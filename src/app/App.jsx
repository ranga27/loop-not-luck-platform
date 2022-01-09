/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
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
              <Router>
                <Switch>
                  <ProtectedRoute
                    path={adminRoot}
                    component={AppRouter}
                    roles={[
                      UserRole.super,
                      UserRole.admin,
                      UserRole.editor,
                      UserRole.employer,
                      UserRole.candidate,
                    ]}
                  />
                  <Route path="/user" children={<ViewUser />} />
                  <Route path="/error" exact children={<ViewError />} />
                  <Route
                    path="/unauthorized"
                    exact
                    children={<ViewUnauthorized />}
                  />
                  <Route path="/" render={() => <Redirect to={adminRoot} />} />
                  <Route path="*" render={() => <Redirect to="/error" />} />
                </Switch>
              </Router>
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
