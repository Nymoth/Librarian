import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LocalForm } from 'react-redux-form';

import { startEditingBook, cancelEditingBook, editBook, createBook } from '../../actions';

import { formatDate } from '../../util';

import EditableField from './components/EditableField';
import Input from '../../components/Input';
import InputDate from '../../components/InputDate';
import Select from '../../components/Select';

import { NavigationWrapper, DataField } from '../../styles/mixins';
import IconButton from '../../components/IconButton';

class Book extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
  }

  startEditing = book => {
    const { dispatch, books } = this.props;
    dispatch(startEditingBook(books, book));
  }

  cancelEditing = book => {
    const { dispatch, books } = this.props;
    dispatch(cancelEditingBook(books, book));
  }

  goBack = (book, newBook) => {
    const { history } = this.props;
    if (!newBook) {
      this.cancelEditing(book);
    }
    history.goBack();
  }

  submitForm = (book, edit, newBook) => {
    const valid = Object.keys(edit)
      .map(k => edit[k] !== '')
      .reduce((a, b) => a && b);
    if (valid) {
      if (newBook) {
        this.createBook(edit);
      } else {
        this.editBook(book, edit);
      }
    }
  }

  cancelForm = (book, newBook) => {
    if (newBook) {
      const { history } = this.props;
      history.goBack();
    } else {
      this.cancelEditing(book);
    }
  }

  editBook = (book, edit) => {
    const { dispatch, books } = this.props;
    dispatch(editBook(books, book, edit));
  }

  createBook = book => {
    const { dispatch, books, history } = this.props;
    dispatch(createBook(books, book));
    history.replace(`/book/${books.length}`);
  }

  render() {
    const { books, genres } = this.props;
    const { id } = this.props.match.params;

    let book = {
      title: '',
      ISBN: '',
      author: '',
      date: '',
      editing: true
    }

    const newBook = id === 'new';

    if (!newBook) {
      book = books.find(book => book._id === +id);
    }

    if (!book) {
      return (<p>Book not found.</p>);
    } else {
      return (
        <LocalForm model="book" onSubmit={edit => this.submitForm(book, edit, newBook)}>
          <NavigationWrapper>
            <IconButton icon="chevron-left" action={() => this.goBack(book, newBook)} />
            <span className="left-side">{newBook ? 'New book' : book.title}</span>
            <div className="fill"></div>
            {
              !book.editing ? (
                <span>
                  <IconButton icon="edit-2" action={() => this.startEditing(book)} />
                </span>
              ) : (
                <span className="actions">
                  <IconButton icon="x" action={() => this.cancelForm(book, newBook)} />
                  <IconButton icon="check" submit />
                </span>
              )
            }
          </NavigationWrapper>
          <DataField>
            <EditableField changeWhen={book.editing} title="Title" value={book.title || ''}>
              <Input model="title" defaultValue={book.title}  placeholder="Title of the book" />
            </EditableField>
            <EditableField changeWhen={book.editing} title="ISBN" value={book.ISBN || ''}>
              <Input model="ISBN"  defaultValue={book.ISBN} pattern="\d{3}-\d-\d{3}-\d{5}-\d" placeholder="XXX-X-XXX-XXXXX-X" />
            </EditableField>
            <EditableField changeWhen={book.editing} title="Author" value={book.author || ''}>
              <Input model="author" defaultValue={book.author} placeholder="Author of the book" />
            </EditableField>
            <EditableField changeWhen={book.editing} title="Date" value={formatDate(book.date) || ''}>
              <InputDate model="date" defaultValue={book.date} />
            </EditableField>
            <EditableField changeWhen={book.editing} title="Genre" value={book.genre || ''}>
              <Select model="genre" defaultValue={book.genre}>
                <option value="">Book genre</option>
                {genres.map((genre, i) => <option value={genre} key={`genre-${i}`}>{genre}</option>)}
              </Select>
            </EditableField>
            {
              book.hasOwnProperty('users') && book.users.length > 0 ? (
                <div>
                  <p className="field-label">Users</p>
                  <ul>{book.users.map((user, i) =>
                    <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
                  )}</ul>
                </div>
              ) : null
            }
          </DataField>
        </LocalForm>
      );
    }
  }
}

const mapStateToProps = state => {
  const { books, genres } = state.getItems;
  return {
    books,
    genres
  }
}

export default connect(mapStateToProps)(Book);
