import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchBooksIfNeeded } from '../actions';

class User extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchBooksIfNeeded()); // change to fetchApiIfNeeded..
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  const { users } = state.getUsers;
  const { loading } = state.getBooks;
  return {
    users,
    loading
  }
}

export default connect(mapStateToProps)(User);
