import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const MenuPanelWrapper = styled('div')`
  border: 1px solid ${props => props.theme.primary};
  border-top: none;
  padding: .5em;

  .panel-field {
    margin-bottom: .5em;
  }

  .panel-actions {
    text-align: right;

    & > * {
      margin: .5em 0 0 .5em;
    }
  }
`

const MenuPanel = ({ showIf, children }) => showIf ? (
  <MenuPanelWrapper>
    {children}
  </MenuPanelWrapper>
) : null;

MenuPanel.propTypes = {
  showIf: PropTypes.bool.isRequired
}

export default MenuPanel;
