import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchBooksIfNeeded } from '../actions';
import ListElement from '../components/ListElement';

class Library extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchBooksIfNeeded());
  }

  render() {
    const { books, loading } = this.props;
    if (loading) {
      return (<p>Loading...</p>);
    } else {
      return (
        <div>{books.map((book, i) =>
          <Link to={`/book/${book.ISBN}`} key={`book-${i}`}>
            <ListElement className="book" title={book.title} subtitle={`${book.author} - ${book.date}`} />
          </Link>
        )}</div>
      );
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

export default connect(mapStateToProps)(Library);
