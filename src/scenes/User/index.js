import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import IconButton from '../../components/IconButton';
import { NavigationWrapper, DataField, FieldLabel, Field } from '../../styles/mixins';

class User extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { users, history } = this.props;
    const { id } = this.props.match.params;
    const user = users.find(user => user.id === +id);

    if (!user) {
      return (<p>User not found.</p>);
    } else {
      return (
        <div>
          <NavigationWrapper>
            <IconButton icon="chevron-left" action={history.goBack} />
            <span className="left-side">{user.name}</span>
          </NavigationWrapper>
          <DataField>
            <FieldLabel>User</FieldLabel>
            <Field>{user.name}</Field>
            <FieldLabel>Books</FieldLabel>
            <ul>
              {user.books
                .map((book, i) => (
                  <li className="book" key={book._id}><Link to={`/book/${book._id}`}>{book.title}</Link></li>
                )
              )}
            </ul>
          </DataField>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { users } = state.getItems;
  return {
    users,
  }
}

export default connect(mapStateToProps)(User);
