import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';

import { InputWrapper } from '../styles/mixins';

const InputDate = ({
  model,
  defaultValue = ''
}) => (
  <InputWrapper>
    <Control type="date" model={`.${model}`} defaultValue={defaultValue || ''} />
  </InputWrapper>
);

InputDate.propTypes = {
  model: PropTypes.string.isRequired,
  defaultValue: PropTypes.string
}

export default InputDate;
