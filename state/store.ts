import { createStore } from "redux";
import { rootReducer } from "./reducers";

export const mainStore = createStore(rootReducer);