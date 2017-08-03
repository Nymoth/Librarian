import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';

import { InputWrapper } from '../styles/mixins';

const Select = ({
  model,
  defaultValue = '',
  children
}) => (
  <InputWrapper>
    <Control.select model={`.${model}`} defaultValue={defaultValue || ''}>
      {children}
    </Control.select>
  </InputWrapper>
);

Select.propTypes = {
  model: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
}

export default Select;
