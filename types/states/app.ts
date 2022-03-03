import { HomeState, UserState } from ".";
import { CollabRequestState } from "./collab";
import { ArtistCategoriesState } from "./artistCategories";
import { UserSampleState } from "./sample";
import { CategoryState } from "./category";

export interface AppState {
  home: HomeState;
  user: UserState;
  collab: CollabRequestState;
  sample: UserSampleState;
  category: CategoryState;
}