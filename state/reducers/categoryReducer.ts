import * as actionType from "../actionTypes/categoryActionTypes";
import { CategoryState } from "types/states/category";

const initialState: CategoryState = {
  selectedId: -1,
  isFetchingArtists: false,
  isFetchingCategories: false,
  categories: [],
  artists: [],
};

const categoryReducer = (state = initialState, action): CategoryState => {
  switch (action.type) {
    case actionType.SET_SELETECTED_ID:
      return {
        ...state,
        selectedId: action.payload.id,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_REQUEST:
      return {
        ...state,
        artists: [],
        isFetchingArtists: true,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        artists: action.payload.data.data,
        isFetchingArtists: false,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_FAILURE:
      return {
        ...state,
        isFetchingArtists: false,
      };
    case actionType.FETCH_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        isFetchingCategories: true,
      };
    case actionType.FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetchingCategories: false,
        categories: action.payload.data.data,
      };
    case actionType.FETCH_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetchingCategories: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
