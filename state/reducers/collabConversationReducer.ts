import * as actionType from "../actionTypes/collabConversationActionTypes";
import { CollabConversationState } from "types/states/collabConversation";

const initialState: CollabConversationState = {
    isFetchingCollabConversation: false,
    isAddingCollabConversationComment: false,
    collabConversation: [],
};

const collabConversationReducer = (state = initialState, action): CollabConversationState => {
  switch (action.type) {
    case actionType.FETCH_COLLAB_CONVERSATION_BY_COLLAB_ID:
      return {
        ...state,
        collabConversation: [],
        isFetchingCollabConversation: true,
      };
    case actionType.FETCH_COLLAB_CONVERSATION_BY_COLLAB_ID_SUCCESS:

      return {
        ...state,
        collabConversation: action.payload.data,
        isFetchingCollabConversation: false,
      };
    case actionType.FETCH_COLLAB_CONVERSATION_BY_COLLAB_ID_FAILURE:
      return {
        ...state,
        isFetchingCollabConversation: false,
      };

    case actionType.ADD_COLLAB_CONVERSATION_COMMENT:
      return {
        ...state,
        isFetchingCollabConversation: true,
      };

    case actionType.ADD_COLLAB_CONVERSATION_COMMENT_SUCCESS:
      let updatedCollabConversation = []
    //   if (state.socialProspectus.length > 0 ) {
    //     const oldSocialProspectus = state.socialProspectus[0]["data"];
    //     oldSocialProspectus.forEach((prospectusEntry, index) => {
    //       if (prospectusEntry.socialPlatformId !== action.payload.data.data.socialPlatformId) {
    //         updatedSocialProspectus.push(prospectusEntry);
    //       }
    //     });
    //   }
    //   updatedSocialProspectus.push(action.payload.data.data);
      return {
        ...state,
        isFetchingCollabConversation: false,
        collabConversation: [{"data": updatedCollabConversation}]
      };
    case actionType.ADD_COLLAB_CONVERSATION_COMMENT_FAILURE:
      return {
        ...state,
        isFetchingCollabConversation: false,
      };
    default:
      return state;
  }
};

export default collabConversationReducer;
