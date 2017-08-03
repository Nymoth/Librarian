import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LocalForm } from 'react-redux-form';

import { toggleBooksSearchMenu, setBooksSearchField, setBooksSearchValue, resetBooksSearch } from '../../../actions';

import MenuPanel from '../components/MenuPanel';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import Input from '../../../components/Input';

class SearchMenuPanel extends Component {
  static propTypes = {
    genres: PropTypes.array.isRequired,
    searchMenuVisible: PropTypes.bool.isRequired,
    searchField: PropTypes.string,
    searchValue: PropTypes.string,
  }

  toggleSearchMenu = () => {
    const { dispatch } = this.props;
    dispatch(toggleBooksSearchMenu());
  }

  changeBooksSearchField = changes => {
    const { dispatch } = this.props;
    const { searchField } = changes;
    dispatch(setBooksSearchField(searchField))
  }

  submitSearchForm = (searchField, searchForm) => {
    const { dispatch } = this.props;
    const searchValue = searchForm[searchField];
    dispatch(setBooksSearchValue(searchValue));
  }

  resetSearch = () => {
    const { dispatch } = this.props;
    dispatch(resetBooksSearch());
    this.toggleSearchMenu();
  }

  render() {
    const { genres, searchMenuVisible, searchField, searchValue } = this.props;
    return (
      <MenuPanel showIf={searchMenuVisible}>
        <LocalForm onSubmit={form => this.submitSearchForm(searchField, form)} onChange={this.changeBooksSearchField}>
          <Select className="panel-field" model="searchField" defaultValue={searchField}>
            <option value="">Search field</option>
            <option value="title">Title</option>
            <option value="ISBN">ISBN</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
          </Select>
          {searchField === 'title' ? <Input model="title" placeholder="Book title" defaultValue={searchValue} /> : null}
          {searchField === 'ISBN' ? <Input model="ISBN" pattern="\d{3}-\d-\d{3}-\d{5}-\d" placeholder="ISBN: XXX-X-XXX-XXXXX-X" defaultValue={searchValue} /> : null}
          {searchField === 'author' ? <Input model="author" placeholder="Book author" defaultValue={searchValue} /> : null}
          {searchField === 'genre' ? (
            <Select model="genre" defaultValue={searchValue}>
              <option value={null}>Book genre</option>
              {genres.map((genre, i) => <option value={genre} key={`genre-${i}`}>{genre}</option>)}
            </Select>
          ) : null}
          <div className="panel-actions">
            <Button secondary action={this.resetSearch}>Cancel</Button>
            <Button primary submit>Search</Button>
          </div>
        </LocalForm>
      </MenuPanel>
    );
  }
}

const mapStateToProps = state => {
  const { genres } = state.getItems;
  const { searchMenuVisible, searchField, searchValue } = state.getLayout;
  return {
    genres,
    searchMenuVisible,
    searchField,
    searchValue
  }
}

export default connect(mapStateToProps)(SearchMenuPanel);
