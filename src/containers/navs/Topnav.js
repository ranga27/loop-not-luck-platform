import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from '../../redux/actions';
import { isDarkSwitchActive, adminRoot } from '../../constants/defaultValues';
import TopnavDarkSwitch from './Topnav.DarkSwitch';
import { logoutUser } from '../../redux/auth/authSlice';

const TopNav = ({ logoutUserAction }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [isInFullScreen, setIsInFullScreen] = useState(false);

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    try {
      logoutUserAction(currentUser);
    } catch (e) {
      throw new Error('Error while signing out');
    }
  };

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left" />
      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        {currentUser.role === 'super' && (
          <>
            <NavLink to="/app/test">Test</NavLink>
            <NavLink to="/app/users">Users</NavLink>
          </>
        )}
        {currentUser.role === 'employer' && (
          <NavLink to="/app/post-role">Post Role</NavLink>
        )}
        {isDarkSwitchActive && <TopnavDarkSwitch />}
        <div className="header-icons d-inline-block align-middle">
          <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button>
        </div>
        <Nav pills className="nav-pills">
          <NavItem className="mx-3">
            <NavLink to="account">Account</NavLink>
          </NavItem>
          <NavItem className="mx-3">
            <NavLink to="/" onClick={() => handleLogout()}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
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
    logoutUserAction: logoutUser,
  })(TopNav)
);
