import { HomeState, UserState } from ".";
import { CollabRequestState } from "./collab";
import { ArtistCategoriesState } from "./artistCategories";
import { UserSampleState } from "./sample";
import { CategoryState } from "./category";
import { ScratchpadState } from "./scratchpad";

export interface AppState {
  home: HomeState;
  user: UserState;
  collab: CollabRequestState;
  sample: UserSampleState;
  category: CategoryState;
  scratchpad: ScratchpadState;
}