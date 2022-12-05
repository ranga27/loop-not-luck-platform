import React from 'react';

const BetaBanner = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: '99999',
        border: '1px solid lightgray',
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(5px)',
      }}
    >
      This is a beta site, Please submit any feedback:{' '}
      <a style={{ color: 'steelblue' }} href="mailto:hello@loopnotluck.com">
        hello@loopnotluck.com
      </a>
    </div>
  );
};

export default BetaBanner;
