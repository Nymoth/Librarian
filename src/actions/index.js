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

const mock = {
	"books": [
		{
			"title": "Cien años de soledad",
			"date": "1967-01-12",
			"author": "Gabriel García Márquez",
			"ISBN": "978-3-598-21500-1",
			"genre": "novela",
			"users": [
				{
					"id": 1,
					"name": "Isidro Pérez"
				},
				{
					"id": 2,
					"name": "José Manuel Santos"
				},
				{
					"id": 3,
					"name": "Trinidad Alonso"
				}
			]
		},
		{
			"title": "Las Aventuras de Huckleberry Finn",
			"date": "1998-04-12",
			"author": "Mark Twain",
			"ISBN": "978-3-598-21501-8",
			"genre": "aventura",
			"users": [
				{
					"id": 4,
					"name": "Jose Miguel Sanchez"
				},
				{
					"id": 5,
					"name": "Beatriz Reyes"
				},
				{
					"id": 6,
					"name": "Rosario Garcia"
				}
			]
		},
		{
			"title": "El Conde de Montecristo",
			"date": "1989-01-12",
			"author": "Alexandre Dumas",
			"ISBN": "978-3-598-21502-5",
			"genre": "aventura",
			"users": [
				{
					"id": 6,
					"name": "Rosario Garcia"
				},
				{
					"id": 1,
					"name": "Isidro Pérez"
				},
				{
					"id": 4,
					"name": "Jose Miguel Sanchez"
				}
			]
		},
		{
			"title": "El señor de los anillos",
			"date": "1964-08-25",
			"author": "John Ronald Reuel Tolkien",
			"ISBN": "978-3-598-21503-2",
			"genre": "fantasía",
			"users": [
				{
					"id": 5,
					"name": "Beatriz Reyes"
				},
				{
					"id": 2,
					"name": "José Manuel Santos"
				},
				{
					"id": 3,
					"name": "Trinidad Alonso"
				}
			]
		},
		{
			"title": "Drácula",
			"date": "1986-07-03",
			"author": "Bram Stoker",
			"ISBN": "978-3-598-21504-9",
			"genre": "terror",
			"users": [
				{
					"id": 7,
					"name": "Vanesa Castro"
				},
				{
					"id": 2,
					"name": "José Manuel Santos"
				},
				{
					"id": 6,
					"name": "Rosario Garcia"
				}
			]
		},
		{
			"title": "Orgullo y prejuicio",
			"date": "1966-11-23",
			"author": "Jane Austen",
			"ISBN": "978-3-598-21505-6",
			"genre": "amor",
			"users": [
				{
					"id": 4,
					"name": "Jose Miguel Sanchez"
				},
				{
					"id": 8,
					"name": "Julio Navarro"
				},
				{
					"id": 2,
					"name": "José Manuel Santos"
				}
			]
		},
		{
			"title": "El exorcista",
			"date": "2000-07-05",
			"author": "Jane Austen",
			"ISBN": "978-3-598-21506-3",
			"genre": "terror",
			"users": [
				{
					"id": 1,
					"name": "Isidro Pérez"
				},
				{
					"id": 2,
					"name": "José Manuel Santos"
				},
				{
					"id": 7,
					"name": "Vanesa Castro"
				}
			]
		},
		{
			"title": "El resplandor",
			"date": "1991-05-11",
			"author": "Stephen King",
			"ISBN": "978-3-598-21507-0",
			"genre": "terror",
			"users": [
				{
					"id": 1,
					"name": "Isidro Pérez"
				},
				{
					"id": 8,
					"name": "Julio Navarro"
				},
				{
					"id": 3,
					"name": "Trinidad Alonso"
				}
			]
		},
		{
			"title": "Hamlet",
			"date": "1982-08-01",
			"author": "William Shakespeare",
			"ISBN": "978-3-598-21508-7",
			"genre": "aventura",
			"users": [
				{
					"id": 1,
					"name": "Isidro Pérez"
				},
				{
					"id": 4,
					"name": "Jose Miguel Sanchez"
				},
				{
					"id": 3,
					"name": "Trinidad Alonso"
				}
			]
		},
		{
			"title": "El Principito",
			"date": "1999-07-27",
			"author": "Antoine de Saint-Exupéry",
			"ISBN": "978-3-598-21509-4",
			"genre": "infantil",
			"users": [
				{
					"id": 1,
					"name": "Isidro Pérez"
				},
				{
					"id": 5,
					"name": "Beatriz Reyes"
				},
				{
					"id": 2,
					"name": "José Manuel Santos"
				}
			]
		}
	]
};

const fetchBooks = () => dispatch => {
  dispatch(booksRequest());
  // return new Promise(resolve =>
  //   resolve(mock))
  return fetch(config.BOOKS_URL)
    .then(res => res.json())
    .then(json => dispatch(booksSuccess(json)))
    .catch(error => dispatch(booksFailure(error)));
};

const shouldFetchBooks = state => {
  const { books, loading } = state.getBooks;
  if (books.length === 0) {
    return true;
  }
  if (loading) {
    return false;
  }
}

export const fetchBooksIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchBooks(getState())) {
    return dispatch(fetchBooks());
  }
}

// export const GET_BOOK = 'GET_BOOK';

// export const getBook = isbn => ({
//   type: GET_BOOK,
//   isbn
// });

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
