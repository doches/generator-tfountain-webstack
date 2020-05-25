import * as React from "react";
import * as ReactDom from "react-dom";
<% if (redux) { %>
import * as BrowserHistory from "history";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./state";
<% } %>

import { App } from "./app";

import "./index.less";

// create a top-level div for React to render into
const element = document.createElement("div");
document.body.appendChild(element);

<% if(redux) { %>
const history = BrowserHistory.createBrowserHistory({
  basename: "/",
});

const reduxRouterMiddleware = routerMiddleware(history);

const reducer = combineReducers({
  ...reducers,
  router: routerReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, reduxRouterMiddleware),
);

ReactDom.render((
  <Provider store={store}>
    <Router history={history}>
      <div className="root-container">
        <Route path={"/"} component={App} />
      </div>
    </Router>
</Provider>
), element);
<% } else { %>
ReactDom.render(
    (
        <App />
    ),
    element
);
<% } %>