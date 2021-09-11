import {
  applyMiddleware,
  compose,
  createStore,
  Store,
  StoreCreator,
} from "redux";
import { createLogicMiddleware } from "redux-logic";
import rootLogic from "./rootLogic";
import rootReducer from "./rootReducer";
import { AppState as ImportedAppState } from "types/states";
import { getUserData } from "api/user";
import { getSearchResult } from "api/search";
import { AppRouteCreators } from "types/core";

export type AppState = ImportedAppState;

export const APIs = {
  getUserData,
  getSearchResult,
};

export interface LogicDeps {
  api: typeof APIs;
  routes: AppRouteCreators;
}

const createNewStore = (
  routes: AppRouteCreators,
  preloadedState = {}
): Store<AppState> => {
  const logicDeps: LogicDeps = {
    api: APIs,
    routes,
  };
  const logicMiddleware = createLogicMiddleware(rootLogic, logicDeps);
  const enhancers = [applyMiddleware(logicMiddleware)];
  /* eslint-disable no-underscore-dangle */
  if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    /* eslint-disable no-underscore-dangle */
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const configureStore = compose(...enhancers)(createStore) as StoreCreator;
  return configureStore(rootReducer, preloadedState);
};

let store: Store<AppState>;

const State = (
  routes: AppRouteCreators,
  preloadedState = {}
): Store<AppState> => {
  if (typeof window === "undefined") {
    return createNewStore(routes, preloadedState);
  }

  // Create store if unavailable on the client
  if (!store) {
    store = createNewStore(routes, preloadedState);
  }

  return store;
};

export default State;
