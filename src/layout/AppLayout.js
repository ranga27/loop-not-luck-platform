import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import TopNav from '../containers/navs/Topnav';
import Sidebar from '../containers/navs/Sidebar';
import Footer from '../containers/navs/Footer';

const AppLayout = ({ children }) => {
  const { containerClassnames } = useSelector((state) => state.menu);
  const user = useQuery('userDoc');
  if (user.isLoading) {
    return <div className="loading" />;
  }
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav />
      <Sidebar role={user.data.role} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
