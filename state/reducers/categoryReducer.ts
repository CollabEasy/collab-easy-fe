import * as actionType from "../actionTypes/categoryActionTypes";
import { CategoryState } from "types/states/category";

const initialState: CategoryState = {
  selectedCategoryId: -1,
  selectedCategorySlug: "",
  isFetchingArtists: false,
  isFetchingCategories: false,
  errorInFetchingArtists: false,
  categories: [],
  artists: [],
};

const categoryReducer = (state = initialState, action): CategoryState => {
  switch (action.type) {
    case actionType.SET_SELETECTED_CATEGORY_ID:
      return {
        ...state,
        selectedCategoryId: action.payload.id,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_ID_REQUEST:
      return {
        ...state,
        artists: [],
        isFetchingArtists: true,
        errorInFetchingArtists: false,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        artists: action.payload.data.data,
        isFetchingArtists: false,
        errorInFetchingArtists: false,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_ID_FAILURE:
      return {
        ...state,
        isFetchingArtists: false,
        errorInFetchingArtists: true,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_SLUG_REQUEST:
      return {
        ...state,
        artists: [],
        isFetchingArtists: true,
        errorInFetchingArtists: false,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_SLUG_SUCCESS:
      return {
        ...state,
        artists: action.payload.data.data,
        isFetchingArtists: false,
        errorInFetchingArtists: false,
      };
    case actionType.FETCH_ARTIST_BY_CATEGORY_SLUG_FAILURE:
      return {
        ...state,
        isFetchingArtists: false,
        errorInFetchingArtists: true,
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
