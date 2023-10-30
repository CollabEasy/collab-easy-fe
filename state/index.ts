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
import * as searchApi from "api/search"
import * as collabApi from "api/collab"
import * as loginApi from "api/login"
import * as artistApi from "api/artist-user"
import * as scratchpadApi from "api/scratchpad"
import * as socialProspectusApi from "api/social-prospectus"
import * as collabConversationApi from "api/collab-conversation"
import * as analyticsApi from "api/analytics";
import * as contestApi from "api/contest";
import * as emailApi from "api/email";
import * as rewardsApi from "api/rewards";
import * as proposalApi from "api/proposal";
import * as proposalInterestApi from "api/proposal-interest";

import { AppRouteCreators } from "types/core";

export type AppState = ImportedAppState;

export const APIs = {
  searchApi,
  collabApi,
  loginApi,
  artistApi,
  scratchpadApi,
  socialProspectusApi,
  collabConversationApi,
  analyticsApi,
  contestApi,
  emailApi,
  rewardsApi,
  proposalApi,
  proposalInterestApi,
};

export interface LogicDeps {
  api: typeof APIs;
  routes: AppRouteCreators;
}
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
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
  // if (typeof window !== "undefined") {
  //   const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
  //   /* eslint-disable no-underscore-dangle */
  //   enhancers.push(composeEnhancers);
  // }

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
