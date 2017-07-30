import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBooks } from '../actions';
import Book from '../components/Book';


class BooksList extends Component {

  componentWillMount() {
    loadBooks();
  }

  // componentWillReceiveProps() {
  //   loadBooks();
  // }

  render() {
    console.log(this.props)
    const { books } = this.props;

    if (!books || books.length === 0) {
      return <h1>Loading...</h1>
    }

    return (
      books.map(book => <Book {...book} />)
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { books } = state.entities;

  return {
    books
  }
}

export default connect(mapStateToProps, {
  loadBooks
})(BooksList);
