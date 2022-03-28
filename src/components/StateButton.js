import React, { useState } from 'react';
import { Button } from 'reactstrap';
import classnames from 'classnames';

const StateButton = ({
  id,
  className,
  color,
  children,
  onClick,
  disabled = false,
  outline,
}) => {
  const [status, setStatus] = useState('default');

  const handleOnClick = () => {
    setStatus('processing');

    onClick()
      .then(() => {
        setStatus('success');
      })
      .catch(() => {
        setStatus('fail');
      })
      .finally(() => {
        setTimeout(() => {
          setStatus('default');
        }, 3000);
      });
  };

  return (
    <span>
      <Button
        id={id}
        className={`slider-top-button btn-multiple-state  ${className}  ${classnames(
          {
            'show-spinner': status === 'processing',
            'show-success': status === 'success',
            'show-fail': status === 'fail',
          }
        )}`}
        color={color}
        onClick={handleOnClick}
        disabled={disabled}
        outline={outline}
      >
        <span className="spinner d-inline-block">
          <span className="bounce1" />
          <span className="bounce2" />
          <span className="bounce3" />
        </span>
        <span className="icon success">
          <i className="simple-icon-check" />
        </span>
        <span className="icon fail">
          <i className="simple-icon-exclamation" />
        </span>
        <span className="label">{children}</span>
      </Button>
    </span>
  );
};

export default StateButton;
