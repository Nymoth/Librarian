import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { fetchBooksIfINeeded } from '../actions';
import Book from '../components/Book';

const Layout = styled('div')`
  height: 100vh;
  font-family: ${props => props.theme.mainFont};
  font-size: 12px;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.background};
  padding-top: ${props => props.theme.headerHeight};

  .header {
    position: fixed;
    top: 0;
    height: ${props => props.theme.headerHeight};
    line-height: ${props => props.theme.headerHeight};
    width: 100%;
    padding: 0 1em;
    background: ${props => props.theme.primary};
    color: ${props => props.theme.background};
    box-shadow: 0px 0px 10px 0 ${props => props.theme.primary};
  }
  .header-logo {
    font-family: ${props => props.theme.logoFont};
    font-size: 2em;
    font-weight: bold;
  }
  .header-fill {
    flex: 1 1 auto;
  }
`

class App extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBooksIfINeeded());
  }

  render() {
    const { books } = this.props;
    return (
      <Layout>
        <div className="header">
          <div className="header-logo">Librarian</div>
          <div className="header-fill"></div>
          <div className="header-action"></div>
          <div className="header-action"></div>
          <div className="header-action"></div>
        </div>
        {books.map((book, i) => <Book {...book} key={book.title} />)}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  const { books, loading, error } = state.getBooks;
  return {
    books,
    loading,
    error
  }
}

export default connect(mapStateToProps)(App);
