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
      // const updatedId = action.payload.data;
      // const newProspectusData = [];
      // const oldProspectusData = state.socialProspectus;
      // if (oldProspectusData.length != 0) {
      //   oldProspectusData[0].data.forEach((entry, index) => {
      //     if (entry.socialPlatformId !== updatedId.socialPlatformId) {
      //       newData.push(entry);
      //     }
      //   });
      // }
      // newProspectusData.push(action.payload.data);

      return {
        ...state,
        isUpdatingProspectus: false,
        socialProspectus: [{ "data": [action.payload.data.data].concat(...state.socialProspectus[0].data) }],
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
      const deletedId = action.payload.data;
      const newData = [];
      const oldData = state.socialProspectus;
      if (oldData.length != 0) {
        oldData[0].data.forEach((entry, index) => {
          if (entry.socialPlatformId !== deletedId) {
            newData.push(entry);
          }
        });
      }
      return {
        ...state,
        isDeletingProspectus: false,
        hasDeletedProspectus: true,
        socialProspectus: [{ "data": newData }],
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
