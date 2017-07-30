import config from '../config';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';

export const booksRequest = () => ({
  type: BOOKS_REQUEST
});

export const booksSuccess = json => ({
  type: BOOKS_SUCCESS,
  books: json.books
});

export const booksFailure = error => ({
  type: BOOKS_FAILURE,
  error
});

const fetchBooks = () => dispatch => {
  dispatch(booksRequest());
  return fetch(config.BOOKS_URL)
    .then(res => res.json())
    .then(json => dispatch(booksSuccess(json)))
    .catch(error => dispatch(booksFailure(error)));
};

const shouldFetchBooks = state => {
  const books = state.books;
  if (!books) {
    return true;
  }
  if (books.loading) {
    return false;
  }
}

export const fetchBooksIfINeeded = () => (dispatch, getState) => {
  if (shouldFetchBooks(getState())) {
    return dispatch(fetchBooks());
  }
}

export const SORT_BOOKS = 'SORT_BOOKS';

export const sortBooks = (books, field, dir) => ({
  type: SORT_BOOKS,
  books,
  sortField: field,
  sortDir: dir
});

export const FILTER_BOOKS = 'FILTER_BOOKS';

export const filterBooks = (books, fields, search) => ({
  type: FILTER_BOOKS,
  books,
  filterFields: fields,
  filterSearch: search
});
