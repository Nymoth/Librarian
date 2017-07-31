import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { fetchBooksIfNeeded } from '../actions';
import Button from '../components/Button';

const BookWrapper = styled('div')`
  padding: .5em;
`

class Book extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchBooksIfNeeded());
  }

  render() {
    const { books, loading, history } = this.props;
    const { isbn } = this.props.match.params;
    const book = books.find(book => book.ISBN === isbn);
    if (loading) {
      return (<p>Loading...</p>)
    } else {
      if (!book) {
        return (<p>Book not found.</p>);
      } else {
        return (
          <BookWrapper>
            <div className="header" onClick={history.goBack}>
              <Button icon>&lt;</Button>
              <span className="title">{book.title}</span>
            </div>
            <div className="fields">
              <p>Author: {book.author}</p>
              <p>Date: {book.date}</p>
              <p>Genre: {book.genre}</p>
            </div>
            <div className="users">
              <p>Users</p>
              {book.users.map((user, i) =>
                <div className="user" key={user.id}>{user.name}</div>
              )}
            </div>
          </BookWrapper>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  const { books, loading } = state.getBooks;
  return {
    books,
    loading
  }
}

export default connect(mapStateToProps)(Book);
