import React from 'react';

import './form-input.style.scss';

export default function FormInput(props) {
  const { label, inputOptions } = props;
  return (
    <div className='group'>
      <input
        className='form-input'
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputOptions}
      />
      {label && (
        <label
          className={`${
            inputOptions.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
