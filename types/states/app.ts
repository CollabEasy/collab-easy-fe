import { HomeState, UserState } from ".";
import { CollabRequestState } from "./collab";
import { ArtistCategoriesState } from "./artistCategories";

export interface AppState {
  home: HomeState;
  user: UserState;
  collab: CollabRequestState
  artist: ArtistCategoriesState;
}