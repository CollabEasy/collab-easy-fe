import { ArtistCategoriesState } from "types/states";
import { SET_ARTIST_CATEGORIES_DATA } from "state/action/artistAction";

const initialState: ArtistCategoriesState = {
  artistCategories: {},
};

const artistReducer = (state = initialState, action): any => {
  switch (action.type) {
    case SET_ARTIST_CATEGORIES_DATA:
      return {
        ...state,
        artistCategories: action.payload.data
      };
    default:
      return state
  }
};

export default artistReducer