/* eslint-disable import/prefer-default-export */
import React from 'react';
import StateButton from '../../components/StateButton';

export const renderTopCenterControls = (
  roles,
  currentSlide,
  goToSlide,
  saveRole,
  applyRole
) => {
  return (
    <div>
      <div className="slider-dot-container">
        {roles.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={
              currentSlide === index
                ? 'glide__bullet slider-dot glide__bullet--active'
                : 'glide__bullet slider-dot'
            }
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <div className="slider-top-button-group">
        <StateButton
          id="saveButton"
          color="primary"
          onClick={() => saveRole(currentSlide)}
        >
          <i className="simple-icon-star px-1" />
          Save
        </StateButton>
        <StateButton
          id="applyButton"
          color="info"
          onClick={() => applyRole(currentSlide)}
        >
          <i
            className="simple-icon-pencil
 px-1"
          />
          {roles[currentSlide]?.applied ? 'Applied' : 'Apply'}
        </StateButton>
      </div>
    </div>
  );
};
