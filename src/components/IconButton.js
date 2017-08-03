import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import Icon from './Icon';

const Button = styled('button')`
  padding: 0;
  border: none;
  background: rgba(0,0,0,0);
`

const IconButton = ({
  icon,
  action = () => {},
  submit = false
}) => {
  const attrs = {
    onClick: action,
    type: submit ? 'submit' : 'button'
  }

  return <Button {...attrs}><Icon icon={icon} /></Button>
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  action: PropTypes.func,
  submit: PropTypes.bool
}

export default IconButton;
