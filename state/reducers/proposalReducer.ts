import * as actionType from "../actionTypes/categoryActionTypes";
import { CategoryState } from "types/states/category";

const initialState: CategoryState = {
  selectedCategoryId: -1,
  selectedCategorySlug: "",
  isFetchingArtists: false,
  isFetchingCategories: false,
  errorInFetchingArtists: false,
  categories: [],
  publishedCategories: [],
  artists: [],
  isUpdatingCategory: false,
  showCategoryModal: false,
};

const proposalReducer = (state = initialState, action): CategoryState => {
  switch (action.type) {

    case actionType.ADD_CATEGORY:
        return {
            ...state,
            isUpdatingCategory: false,
        };
    case actionType.ADD_CATEGORY_SUCCESS:
        let updatedCategories = []
        if (state.categories.length > 0) {
            const oldCategories= state.categories;
            oldCategories.forEach((category, index) => {
              if (category.id !== action.payload.data.data.id ) {
                updatedCategories.push(category);
              }
            });
        }
        updatedCategories.push(action.payload.data.data);
        return {
            ...state,
            categories:  updatedCategories,
            isUpdatingCategory: false,
        };
    case actionType.ADD_CATEGORY_FAILURE:
        return {
            ...state,
            isUpdatingCategory: false,
        };

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
      let publishedCategoriesList = []
      if (action.payload.data.data.length > 0) {
          const oldCategories= action.payload.data.data;
          oldCategories.forEach((category, index) => {
            if (category.approved) {
              publishedCategoriesList.push(category);
            }
          });
      }
      return {
        ...state,
        isFetchingCategories: false,
        categories: action.payload.data.data,
        publishedCategories: publishedCategoriesList,
      };
    case actionType.FETCH_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetchingCategories: false,
      };
    
    case actionType.SET_SHOW_CATEGORY_MODAL:
      return {
        ...state,
        showCategoryModal: action.payload.show,
      }
    default:
      return state;
  }
};

export default proposalReducer;
