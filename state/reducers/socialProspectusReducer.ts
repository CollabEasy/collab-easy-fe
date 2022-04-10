import * as actionType from "../actionTypes/socialProspectusActionTypes";
import { SocialProspectusState } from "types/states/socialProspectus";

const initialState: SocialProspectusState = {
  isFetchingProspectus: false,
  isUpdatingProspectus: false,
  isDeletingProspectus: false,
  hasDeletedProspectus: false,
  socialProspectus: [],
  showSocialProspectusModal: false,
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
      let updatedSocialProspectus = []
      if (state.socialProspectus.length > 0 ) {
        const oldSocialProspectus = state.socialProspectus[0]["data"];
        oldSocialProspectus.forEach((prospectusEntry, index) => {
          if (prospectusEntry.socialPlatformId !== action.payload.data.data.socialPlatformId) {
            updatedSocialProspectus.push(prospectusEntry);
          }
        });
      }
      updatedSocialProspectus.push(action.payload.data.data);
      return {
        ...state,
        isUpdatingProspectus: false,
        socialProspectus: [{"data": updatedSocialProspectus}]
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
      const deletedProspectusEntryId = action.payload.data;
      let newSocialProspectus = [];
      if (state.socialProspectus.length > 0 ) {
        const oldSocialProspectus = state.socialProspectus[0]["data"];
        oldSocialProspectus.forEach((prospectusEntry, index) => {
          if (prospectusEntry.socialPlatformId !== deletedProspectusEntryId) {
            newSocialProspectus.push(prospectusEntry);
          }
        });
      }
      return {
        ...state,
        isDeletingProspectus: false,
        hasDeletedProspectus: true,
        socialProspectus: [{"data": newSocialProspectus}]
      };
    case actionType.DELETE_ARTIST_SOCIAL_PROSPECTUS_FAILURE:
      return {
        ...state,
        isDeletingProspectus: false,
        hasDeletedProspectus: false,
      };
    case actionType.SET_SHOW_SOCIAL_PROSPECTUS_MODAL:
      return {
        ...state,
        showSocialProspectusModal: action.payload.show,
      }
    default:
      return state;
  }
};

export default socialProspectusReducer;
