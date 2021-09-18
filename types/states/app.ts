import { HomeState, UserState } from ".";
import { CollabRequestState } from "./collab";

export interface AppState {
  home: HomeState;
  user: UserState;
  collab: CollabRequestState
}