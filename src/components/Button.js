import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const ButtonWrapper = styled('button')`
  display: inline-block;
  height: 2.5em;
  line-height: 2.5em;
  text-align: center;
  border: none;
  border-radius: 3px;
  background-color: ${props => props.theme.background};
  color: ${props =>  props.theme.primary};
  opacity: .8;
  transition: opacity .2s;

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

  &.icon {
    border-radius: 100em;
    width: 2.5em;
  }
`

const Button = ({
  primary = false,
  secondary = false,
  error = false,
  icon = false,
  children
}) => (
  <ButtonWrapper className={
    [primary ? 'primary' :
    secondary ? 'secondary' :
    error ? 'error' : '',
    icon ? 'icon' : ''].join(' ')
  }>{children}</ButtonWrapper>
);

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  error: PropTypes.bool,
  round: PropTypes.bool
}

export default Button;
