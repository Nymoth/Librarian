import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { formatDate } from '../../util';

import Navigation from './containers/Navgation';
import SortMenuPanel from './containers/SortMenuPanel';
import SearchMenuPanel from './containers/SearchMenuPanel';

import ListElement from '../../components/ListElement';

class Library extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    sortField: PropTypes.string,
    sortDir: PropTypes.string,
    searchField: PropTypes.string,
    searchValue: PropTypes.string
  }

  filterBook = (book, searchField, searchValue) => {
    if (searchField && searchValue) {
      return book[searchField].toLowerCase() === searchValue.toLowerCase();
    }
    return true;
  }

  sortBooks = (a, b, field, dir) => {
    const _field = field || '_id';
    const _dir = dir || 'asc'
    const gt = _dir === 'asc' ? 1 : -1;
    const lt = _dir === 'asc' ? -1 : 1;
    if (a[_field] > b[_field]) return gt;
    if (a[_field] < b[_field]) return lt;
    return 0;
  }

  render() {
    const { books, sortField, sortDir, searchField, searchValue } = this.props;
    return (
      <div>
        <Navigation />
        <SortMenuPanel />
        <SearchMenuPanel />
        <div>
          {books
            .filter(book => this.filterBook(book, searchField, searchValue))
            .sort((a, b) => this.sortBooks(a, b, sortField, sortDir))
            .map((book, i) => (
              <Link to={`/book/${book._id}`} key={`book-${i}`}>
                <ListElement className="book" title={book.title} subtitle={`${book.author} - ${formatDate(book.date)}`} />
              </Link>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { books } = state.getItems;
  const { sortField, sortDir, searchField, searchValue } = state.getLayout;
  return {
    books,
    sortField, sortDir,
    searchField, searchValue
  }
}

export default connect(mapStateToProps)(Library);
