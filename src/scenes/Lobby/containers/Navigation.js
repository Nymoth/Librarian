import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { NavigationWrapper } from '../../../styles/mixins';

class Navigation extends Component {

  render() {
    return (
      <NavigationWrapper>
        <div className="left-side">
          <Link to="/">Books</Link> | <span className="current-path" to="/users">Users</span>
        </div>
      </NavigationWrapper>
    );
  }
}

export default connect(state => ({}))(Navigation);
