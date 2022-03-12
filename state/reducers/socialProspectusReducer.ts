import * as actionType from "../actionTypes/socialProspectusActionTypes";
import { SocialProspectusState } from "types/states/socialProspectus";

const initialState: SocialProspectusState = {
  isFetchingProspectus: false,
  isUpdatingProspectus: false,
  isDeletingProspectus: false,
  hasDeletedProspectus: false,
  socialProspectus: [],
};

const socialProspectusReducer = (state = initialState, action): SocialProspectusState => {
  switch (action.type) {
    case actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS:
      return {
        ...state,
        socialProspectus: [],
        isFetchingProspectus: true,
      };
    case actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS_SUCCESS:

      return {
        ...state,
        socialProspectus: action.payload.data,
        isFetchingProspectus: false,
      };
    case actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS_FAILURE:
      return {
        ...state,
        isFetchingProspectus: false,
      };

    case actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_REQUEST:
      return {
        ...state,
        isUpdatingProspectus: true,
      };
    case actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_SUCCESS:
      return {
        ...state,
        isUpdatingProspectus: false,
        socialProspectus: action.payload.data,
      };
    case actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_FAILURE:
      return {
        ...state,
        isUpdatingProspectus: false,
      };
    
    case actionType.DELETE_ARTIST_SOCIAL_PROSPECTUS_REQUEST:
      return {
        ...state,
        isDeletingProspectus: true,
        hasDeletedProspectus: false,
      };
    case actionType.DELETE_ARTIST_SOCIAL_PROSPECTUS_SUCCESS:
      return {
        ...state,
        isDeletingProspectus: false,
        hasDeletedProspectus: true,
        socialProspectus: action.payload.data,
      };
    case actionType.DELETE_ARTIST_SOCIAL_PROSPECTUS_FAILURE:
      return {
        ...state,
        isDeletingProspectus: false,
        hasDeletedProspectus: false,
      };
    default:
      return state;
  }
};

export default socialProspectusReducer;
