import React, { useEffect } from 'react';
import FeedbackPopup from '../components/FeedbackPopup';

const PublicLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);
  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">{children}</div>
      </main>
      <FeedbackPopup />
    </>
  );
};

export default PublicLayout;
