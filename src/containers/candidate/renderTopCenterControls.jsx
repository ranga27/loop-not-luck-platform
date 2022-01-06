/* eslint-disable import/prefer-default-export */
import React from 'react';
import StateButton from '../../components/StateButton';

export const renderTopCenterControls = (
  roles,
  currentSlide,
  goToSlide,
  handleSaveButtonClick,
  handleApplyButtonClick
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
          onClick={() => handleSaveButtonClick(currentSlide)}
        >
          <i className="simple-icon-star pr-3" />
          Save
        </StateButton>
        <StateButton
          id="applyButton"
          color="info"
          onClick={() => handleApplyButtonClick(currentSlide)}
        >
          <i
            className="simple-icon-pencil
 pr-3"
          />
          Apply
        </StateButton>
      </div>
    </div>
  );
};
