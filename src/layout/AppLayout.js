import React from 'react';
import { useSelector } from 'react-redux';
import TopNav from '../containers/navs/Topnav';
import Sidebar from '../containers/navs/Sidebar';

import Footer from '../containers/navs/Footer';

const AppLayout = ({ children }) => {
  const { containerClassnames } = useSelector((state) => state.menu);
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav />
      <Sidebar />

      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
