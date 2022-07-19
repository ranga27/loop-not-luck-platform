import React from 'react';
import Svg from '../../../assets/img/under_construction.svg';

const Messages = () => {
  return (
    <div className="pt-4">
      <img
        src={Svg}
        alt="under construction"
        className="w-40 h-40 mx-auto d-block mb-4"
      />
      <h1 className="mt-3 text-primary text-center mx-auto d-block">
        Coming Soon...
      </h1>
    </div>
  );
};

export default Messages;
