import React from 'react';
import PropTypes from 'prop-types';

import { FieldLabel, Field } from '../../../styles/mixins';

const EditableField = ({
  changeWhen,
  title,
  value,
  children
}) => (
  <label>
    <FieldLabel>Title</FieldLabel>
    <Field>{changeWhen ? children : value}</Field>
  </label>
);

EditableField.propTypes = {
  changeWhen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default EditableField;
