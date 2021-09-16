import { HomeState, UserState } from ".";
import { ArtistCategoriesState } from "./artistCategories";

export interface AppState {
  home: HomeState;
  user: UserState;
  artist: ArtistCategoriesState;
}