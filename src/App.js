import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { fetchApiIfNeeded } from './actions';

import Library from './scenes/Library/';
import Lobby from './scenes/Lobby/';
import Book from './scenes/Book/';
import User from './scenes/User/';

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

const Loading = styled('div')`
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;

  & > .loading-elements {
    width: 100%;
  }
`

const RouterWrapper = styled('div')`
  padding: .5em;
`

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.any,
    loading: PropTypes.bool.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiIfNeeded());
  }

  render() {
    const { history, loading } = this.props;
    return (
      <Layout>
        <Header>
          <div className="header-logo">Librarian</div>
          <div className="header-fill"></div>
          <div className="header-action"></div>
          <div className="header-action"></div>
          <div className="header-action"></div>
        </Header>
        {loading ? (
          <Loading>
            <div className="loading-elements">
              <img src="/loading.gif" alt="loading" />
              <p>Loading...</p>
            </div>
          </Loading>
        ) : (
          <HashRouter history={history}>
            <RouterWrapper>
              <Route exact={true} path="/" component={Library} />
              <Route exact={true} path="/users" component={Lobby} />
              <Route exact={true} path="/book/:id" component={Book} />
              <Route exact={true} path="/user/:id" component={User} />
            </RouterWrapper>
          </HashRouter>
        )}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  const { error, loading } = state.getItems;
  return {
    error,
    loading
  }
}

export default connect(mapStateToProps)(App);
