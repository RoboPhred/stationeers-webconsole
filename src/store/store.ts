import { createStore, compose, applyMiddleware } from "redux";
import freeze from "redux-freeze";
import createSagaMiddleware from "redux-saga";

import { routerMiddleware } from "connected-react-router";

import history from "@/history";

import {
  actionSanitizer,
  stateSanitizer,
  actionsBlacklist
} from "./devtool-sanitizer";

import saga from "./saga";
import reducer from "./reducer";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionSanitizer,
      stateSanitizer,
      actionsBlacklist
    })) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(freeze, sagaMiddleware, routerMiddleware(history))
  )
);

sagaMiddleware.run(saga);

export default store;
