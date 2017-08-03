import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const ButtonWrapper = styled('button')`
  display: inline-block;
  text-align: center;
  border: none;
  border-radius: 3px;
  background-color: ${props => props.theme.background};
  color: ${props =>  props.theme.primary};
  opacity: .8;
  transition: opacity .2s;
  padding: .5em 1em;
  font-family: ${props => props.theme.mainFont};

  &:hover {
    opacity: 1;
  }

  &.primary {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
  }

  &.secondary {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.background};
  }

  &.error {
    background-color: ${props => props.theme.error};
    color: ${props => props.theme.background};
  }
`

const Button = ({
  primary = false,
  secondary = false,
  error = false,
  action = () => {},
  submit = false,
  children
}) => {
  const attrs = {
    onClick: action,
    type: submit ? 'submit' : 'button',
    className: 
      primary ? 'primary' :
      secondary ? 'secondary' :
      error ? 'error' : ''
  }

  return <ButtonWrapper { ...attrs }>{children}</ButtonWrapper>
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  error: PropTypes.bool,
  submit: PropTypes.bool,
  action: PropTypes.func
}

export default Button;
