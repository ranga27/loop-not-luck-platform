import React from 'react';
import { injectIntl } from 'react-intl';
import { NavLink, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { MobileMenuIcon } from '../../components/svg';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from '../../redux/actions';
import { adminRoot } from '../../constants/defaultValues';

const TopNav = ({ containerClassnames, clickOnMobileMenuAction }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { role } = currentUser;
  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  const params = useParams();

  let navText = '';
  switch (params['*']) {
    case 'roles':
      navText = 'You’re in The Loop';
      break;
    case 'applications':
      navText = 'My Applications';
      break;
    case 'saved':
      navText = 'Saved Roles';
      break;
    case 'account':
      navText = 'Profile';
      break;
    default:
      break;
  }

  return (
    <nav className="navbar fixed-top shadow-sm">
      <div className="d-flex align-items-center navbar-left">
        <p
          className="mt-2"
          style={{
            fontWeight: 'bold',
            fontSize: '20px',
            left: '20%',
            marginLeft: '28%',
          }}
        >
          {navText}
        </p>
      </div>
      <NavLink
        to="#"
        location={{}}
        className="menu-button-mobile d-xs-block d-sm-block d-md-none"
        onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
      >
        <MobileMenuIcon />
      </NavLink>
      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>
      <div className="navbar-right">
        {role === 'super' && (
          <>
            <NavLink to="/app/test">Test</NavLink>
            <NavLink to="/app/users">Users</NavLink>
          </>
        )}
        {role === 'employer' && (
          <NavLink to="/app/post-role">Post Role</NavLink>
        )}
        {role === 'candidate' && <NavLink to="/app/roles">Roles</NavLink>}
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
