import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LocalForm } from 'react-redux-form';

import { toggleBooksSortMenu, sortBooks, resetBooksSort } from '../../../actions';

import MenuPanel from '../components/MenuPanel';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

class SortMenuPanel extends Component {
  static propTypes = {
    sortMenuVisible: PropTypes.bool.isRequired,
    sortField: PropTypes.string,
    sortDir: PropTypes.string
  }

  toggleSortMenu = () => {
    const { dispatch } = this.props;
    dispatch(toggleBooksSortMenu());
  }

  submitSortForm = form => {
    const { dispatch } = this.props;
    const { sortField, sortDir } = form;
    dispatch(sortBooks(sortField, sortDir));
  }

  resetSort = () => {
    const { dispatch } = this.props;
    dispatch(resetBooksSort());
    this.toggleSortMenu();
  }

  render() {
    const { sortMenuVisible, sortField, sortDir } = this.props;
    return (
      <MenuPanel showIf={sortMenuVisible}>
        <LocalForm onSubmit={this.submitSortForm}>
          <Select className="panel-field" model="sortField" defaultValue={sortField}>
            <option value="">Sorting field</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="author">Author</option>
          </Select>
          <Select className="panel-field" model="sortDir" defaultValue={sortDir}>
            <option value="">Sorting direction</option>
            <option value="desc">Descending</option>
            <option value="asc">Accending</option>
          </Select>
          <div className="panel-actions">
            <Button secondary action={this.resetSort}>Cancel</Button>
            <Button primary submit>Sort</Button>
          </div>
        </LocalForm>
      </MenuPanel>
    );
  }
}

const mapStateToProps = state => {
  const { sortMenuVisible, sortField, sortDir } = state.getLayout;
  return {
    sortMenuVisible,
    sortField,
    sortDir
  }
}

export default connect(mapStateToProps)(SortMenuPanel);
