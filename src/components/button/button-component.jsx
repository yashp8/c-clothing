import React from 'react';
import './button-styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

export default function Button(props) {
  const { children, buttonType, ...otherProps } = props;
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
