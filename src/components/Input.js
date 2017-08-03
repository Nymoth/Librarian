import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';

import { InputWrapper } from '../styles/mixins';

const Input = ({
  model,
  defaultValue = '',
  placeholder = '',
  pattern = null
}) => (
  <InputWrapper>
    <Control.input model={`.${model}`} defaultValue={defaultValue || ''} placeholder={placeholder} pattern={pattern} />
  </InputWrapper>
);

Input.propTypes = {
  model: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
}

export default Input;
