import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion/react/theming';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import theme from './styles/theme';
import App from './App';

const history = createHistory();
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(
    thunk,
    routerMiddleware(history)
  )
);

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App history={history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
