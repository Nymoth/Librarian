import React from 'react';
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

const Book = book => (
  <BookWrapper>
    <div>
      <div className="title">{book.title}</div>
      <p className="subtitle">{book.author} - {book.date}</p>
    </div>
  </BookWrapper>
);

export default Book;
