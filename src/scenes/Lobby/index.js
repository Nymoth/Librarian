import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from './containers/Navigation';

import ListElement from '../../components/ListElement';

class Lobby extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <Navigation />
        <div>
          {users
            .map((user, i) => (
              <Link to={`/user/${user.id}`} key={`user-${i}`}>
                <ListElement title={user.name} subtitle={`${user.books.length} books`} />
              </Link>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { users } = state.getItems;
  return {
    users,
  }
}

export default connect(mapStateToProps)(Lobby);
