import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import TopNav from '../containers/navs/Topnav';
import Sidebar from '../containers/navs/Sidebar';
import Footer from '../containers/navs/Footer';
import BG from '../assets/logos/plain.png';
import FeedbackPopup from '../components/FeedbackPopup';

const AppLayout = ({ children }) => {
  const { containerClassnames } = useSelector((state) => state.menu);
  const user = useQuery('userDoc');
  if (user.isLoading) {
    return <div className="loading" />;
  }
  const fullName = `${user.data.firstName} ${user.data.lastName || ''}`;
  return (
    <div id="app-container" className={containerClassnames}>
      <img
        alt="LNL"
        src={BG}
        style={{
          width: '300px',
          height: '450px',
          position: 'fixed',
          right: 0,
          top: 100,
        }}
      />
      <TopNav />
      <Sidebar role={user.data.role} fullName={fullName} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
      <FeedbackPopup userFullName={fullName} userEmail={user.data.email} />
    </div>
  );
};

export default AppLayout;
