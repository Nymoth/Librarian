import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';

const getBooks = (state = {
  loading: false,
  books: [],
  error: null
}, action) => {
  switch (action.type) {
    case ActionTypes.BOOKS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.books
      }
    case ActionTypes.BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

const sortBooks = (state = {}, action) => {
  switch (action.types) {
    case ActionTypes.SORT_BOOKS:
      return {
        ...state
      }
    default:
      return state;
  }
}

const filterBooks = (state = {}, action) => {
  switch (action.types) {
    case ActionTypes.FILTER_BOOKS:
      return {
        ...state
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  getBooks,
  sortBooks,
  filterBooks
});

export default rootReducer;