import * as ActionTypes from '../actions';

const getItems = (state = {
  loading: false,
  books: [],
  users: [],
  genres: [],
  error: null
}, action) => {
  switch (action.type) {
    case ActionTypes.API_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.API_SUCCESS:
      const books = action.items;
      const genres = [];
      const usersMap = {};
      books.forEach(book => {
        book.users.forEach(user => {
          if (!usersMap.hasOwnProperty(user.id)) {
            usersMap[user.id] = {
              id: user.id,
              name: user.name,
              books: [ book ]
            }
          } else {
            usersMap[user.id].books.push(book);
          }
        });

        if (genres.indexOf(book.genre) === -1) {
          genres.push(book.genre);
        }
      });
      const users = Object.values(usersMap);

      return {
        ...state,
        loading: false,
        books,
        users,
        genres
      }
    case ActionTypes.API_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case ActionTypes.START_EDITING_BOOK:
      return {
        ...state,
        books: [
          ...action.books.slice(0, action.bookIndex),
          Object.assign({}, action.book, action.edit, { editing: true }),
          ...action.books.slice(action.bookIndex + 1, action.books.length)
        ]
      }

    case ActionTypes.CANCEL_EDITING_BOOK:
      return {
        ...state,
        books: [
          ...action.books.slice(0, action.bookIndex),
          Object.assign({}, action.book, { editing: false }),
          ...action.books.slice(action.bookIndex + 1, action.books.length)
        ]
      }

    case ActionTypes.EDIT_BOOK:
      return {
        ...state,
        books: [
          ...action.books.slice(0, action.bookIndex),
          Object.assign({}, action.book, action.edit, { editing: false }),
          ...action.books.slice(action.bookIndex + 1, action.books.length)
        ]
      }

    case ActionTypes.CREATE_BOOK:
      return {
        ...state,
        books: [
          ...action.books,
          Object.assign({}, action.book, {
            users: [],
            editing: false,
            _id: action.books.length
          })
        ]
      }

    default:
      return state;
  }
}

const getLayout = (state = {
  sortMenuVisible: false,
  searchMenuVisible: false,
  searchField: null,
  searchValue: null
}, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_BOOKS_SORT_MENU:
      return {
        ...state,
        sortMenuVisible: !state.sortMenuVisible,
        searchMenuVisible: !state.sortMenuVisible ? false : state.searchMenuVisible
      }

    case ActionTypes.TOGGLE_BOOKS_SEARCH_MENU:
      return {
        ...state,
        sortMenuVisible: !state.searchMenuVisible ? false : state.sortMenuVisible,
        searchMenuVisible: !state.searchMenuVisible,
      }

    case ActionTypes.SET_BOOKS_SEARCH_FIELD:
      return {
        ...state,
        searchField: action.field,
        searchValue: null
      }

    case ActionTypes.SET_BOOKS_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.value
      }

    case ActionTypes.RESET_BOOKS_SEARCH:
      return {
        ...state,
        searchField: null,
        searchValue: null
      }

    case ActionTypes.SORT_BOOKS:
      return {
        ...state,
        sortField: action.field,
        sortDir: action.dir
      }

    case ActionTypes.RESET_BOOKS_SORT:
      return {
        ...state,
        sortField: null,
        sortDir: null
      }

    default:
      return {
        ...state
      }
  }
}

const reducers = {
  getItems,
  getLayout
};

export default reducers;
