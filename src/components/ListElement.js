import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const BookWrapper = styled('div')`
  margin: .5em;

  .title {
    color: ${props => props.theme.primary};
    font-family: ${props => props.theme.titleFont};
    font-size: 1.8em;
    margin: 0;
  }

  .subtitle {
    color: ${props => props.theme.secondary};
    margin: 0;
  }
`

const ListElement = ({ title, subtitle }) => (
  <BookWrapper>
    <div>
      <div className="title">{title}</div>
      <p className="subtitle">{subtitle}</p>
    </div>
  </BookWrapper>
);

ListElement.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default ListElement;
