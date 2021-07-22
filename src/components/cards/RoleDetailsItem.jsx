import React from 'react';

const Item = ({ title, content }) => {
  return (
    <div>
      <p className="font-weight-bold">{title}</p>
      <p>{content}</p>
    </div>
  );
};

export default Item;
