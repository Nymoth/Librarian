import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import Library from './Library';
import Book from './Book';
import User from './User';

const Layout = styled('div')`
  height: 100vh;
  font-family: ${props => props.theme.mainFont};
  font-size: 12px;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.background};
  padding-top: ${props => props.theme.headerHeight};
`

const Header = styled('div')`
  position: fixed;
  top: 0;
  height: ${props => props.theme.headerHeight};
  line-height: ${props => props.theme.headerHeight};
  width: 100%;
  padding: 0 1em;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.background};
  box-shadow: 0px 0px 10px 0 ${props => props.theme.primary};

  & > .header-logo {
    font-family: ${props => props.theme.logoFont};
    font-size: 2em;
    font-weight: bold;
  }
  & > .header-fill {
    flex: 1 1 auto;
  }
`

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    error: PropTypes.string
  }

  render() {
    const { history } = this.props;
    return (
      <Layout>
        <Header>
          <div className="header-logo">Librarian</div>
          <div className="header-fill"></div>
          <div className="header-action"></div>
          <div className="header-action"></div>
          <div className="header-action"></div>
        </Header>
        <HashRouter history={history}>
          <div>
            <Route exact={true} path="/" component={Library} />
            <Route exact={true} path="/book/:isbn" component={Book} />
            <Route exact={true} path="/user/:id" component={User} />
          </div>
        </HashRouter>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  const { error } = state.getBooks;
  return {
    error
  }
}

export default connect(mapStateToProps)(App);
