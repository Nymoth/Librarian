import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleBooksSortMenu, toggleBooksSearchMenu } from '../../../actions';
import { NavigationWrapper } from '../../../styles/mixins';
import IconButton from '../../../components/IconButton';
import Icon from '../../../components/Icon';

class Navigation extends Component {

  toggleSortMenu = () => {
    const { dispatch } = this.props;
    dispatch(toggleBooksSortMenu());
  }

  toggleSearchMenu = () => {
    const { dispatch } = this.props;
    dispatch(toggleBooksSearchMenu());
  }

  render() {
    return (
      <NavigationWrapper>
        <div className="left-side">
          <span className="current-path">Books</span> | <span><Link to="/users">Users</Link></span>
        </div>
        <div className="fill"></div>
        <span className="actions">
          <IconButton icon="arrow-down" action={this.toggleSortMenu} />
          <IconButton icon="search" action={this.toggleSearchMenu} />
          <Link to="/book/new"><Icon icon="plus" /></Link>
        </span>
      </NavigationWrapper>
    );
  }
}

export default connect(state => ({}))(Navigation);
