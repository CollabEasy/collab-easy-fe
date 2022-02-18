import * as actionType from '../actionTypes/categoryActionTypes';
import { CategoryState } from "types/states/category";

const initialState : CategoryState = {
    selectedId: -1,
    isFetchingArtists: false,
    artists: [],
}

const categoryReducer = (state = initialState, action): CategoryState => {
    switch (action.type) {
        case actionType.SET_SELETECTED_ID:
            return {
                ...state,
                selectedId: action.payload.id
            }
        case actionType.FETCH_ARTIST_BY_CATEGORY_REQUEST:
            return {
                ...state,
                artists: [],
                isFetchingArtists: true,
            }
        case actionType.FETCH_ARTIST_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                artists: action.payload.data.data,
                isFetchingArtists: false,
            }
        default:
            return state;
    }
}

export default categoryReducer;