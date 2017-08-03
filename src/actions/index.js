import config from '../config';

// -- items --

export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAILURE = 'API_FAILURE';

export const apiRequest = () => ({
  type: API_REQUEST
});

export const apiSuccess = items => ({
  type: API_SUCCESS,
  items
});

export const apiFailure = error => ({
  type: API_FAILURE,
  error
});

const fetchApi = () => dispatch => {
  dispatch(apiRequest());
  return fetch(config.BOOKS_URL)
    .then(res => res.json())
    .then(items => items.books.map((item, i) => Object.assign({}, item, { editing: false, _id: i, visible: true })))
    .then(items => dispatch(apiSuccess(items)))
    .catch(error => dispatch(apiFailure(error)));
};

const shouldFetchApi = state => {
  const { books, loading } = state.getItems;
  if (books.length === 0) {
    return true;
  }
  if (loading) {
    return false;
  }
}

export const fetchApiIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchApi(getState())) {
    return dispatch(fetchApi());
  }
}

export const START_EDITING_BOOK = 'START_EDITING_BOOK';

export const startEditingBook = (books, book) => {
  return {
    type: START_EDITING_BOOK,
    bookIndex: books.findIndex(b => b._id === book._id),
    books,
    book
  }
};

export const CANCEL_EDITING_BOOK = 'CANCEL_EDITING_BOOK';

export const cancelEditingBook = (books, book) => ({
  type: CANCEL_EDITING_BOOK,
  bookIndex: books.findIndex(b => b._id === book._id),
  books,
  book
});

export const EDIT_BOOK = 'EDIT_BOOK';

export const editBook = (books, book, edit) => ({
  type: EDIT_BOOK,
  bookIndex: books.findIndex(b => b._id === book._id),
  books,
  book,
  edit
});

export const CREATE_BOOK = 'CREATE_BOOK';

export const createBook = (books, book) => ({
  type: CREATE_BOOK,
  books,
  book
});

// -- layout --

export const TOGGLE_BOOKS_SORT_MENU = 'TOGGLE_BOOKS_SORT_MENU';

export const toggleBooksSortMenu = () => ({
  type: TOGGLE_BOOKS_SORT_MENU
});

export const TOGGLE_BOOKS_SEARCH_MENU = 'TOGGLE_BOOKS_SEARCH_MENU';

export const toggleBooksSearchMenu = () => ({
  type: TOGGLE_BOOKS_SEARCH_MENU
});

export const SET_BOOKS_SEARCH_FIELD = 'SET_BOOKS_SEARCH_FIELD';

export const setBooksSearchField = field => {
  return {
    type: SET_BOOKS_SEARCH_FIELD,
    field
  }
};

export const SET_BOOKS_SEARCH_VALUE = 'SET_BOOKS_SEARCH_VALUE';

export const setBooksSearchValue = value => ({
  type: SET_BOOKS_SEARCH_VALUE,
  value
});

export const RESET_BOOKS_SEARCH = 'RESET_BOOKS_SEARCH';

export const resetBooksSearch = () => ({
	type: RESET_BOOKS_SEARCH,
});

export const SORT_BOOKS = 'SORT_BOOKS';

export const sortBooks = (field, dir) => ({
  type: SORT_BOOKS,
  field,
  dir
});

export const RESET_BOOKS_SORT = 'RESET_BOOKS_SORT';

export const resetBooksSort = () => ({
	type: RESET_BOOKS_SORT,
})