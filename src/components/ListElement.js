import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const BookWrapper = styled('div')`
  margin: .5em;

  &:after {
    content: '';
    width: 80%;
    height: 1px;
    background: linear-gradient(to left, ${props => props.theme.secondary} , rgba(0,0,0,0));
    display: block;
    float: right;
  }

  .title {
    font-family: ${props => props.theme.titleFont};
    color: ${props => props.theme.primary};
    font-size: 1.8em;
    margin: 0;
  }

  .subtitle {
    color: ${props => props.theme.secondary};
    margin: 0;
    text-align: right;
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
