import React from 'react';

const RadioButtonBuilder = ({ label, options, mergeAnswer }) => {
  return (
    <div>
      <p>{label}</p>
      {options.map((radio) => (
        <div key={radio.key}>
          <input
            type="radio"
            id={radio.text}
            name="radio"
            value={radio.text}
            onChange={(e) => {
              mergeAnswer({ [label]: e.target.value });
            }}
          />
          <label htmlFor={radio.text} className="m-2 mt-0">
            {radio.text}
          </label>
          <br />
        </div>
      ))}
    </div>
  );
};

export default RadioButtonBuilder;
