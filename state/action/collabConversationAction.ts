import * as actionType from '../actionTypes/collabConversationActionTypes';

export const fetchCollabConversationByCollabId = (collabId: string) => ({
  type: actionType.FETCH_COLLAB_CONVERSATION_BY_COLLAB_ID,
  payload: {
    collabId,
  }
})

export const fetchCollabConversationByCollabIdRequest = () => ({
  type: actionType.FETCH_COLLAB_CONVERSATION_BY_COLLAB_ID_REQUEST,
  payload: {}
})

export const fetchCollabConversationByCollabIdSuccess = (data: any[]) => ({
  type: actionType.FETCH_COLLAB_CONVERSATION_BY_COLLAB_ID_SUCCESS,
  payload: {
    data
  }
})

export const addCollabConversationComment = (data: any) => ({
	type: actionType.ADD_COLLAB_CONVERSATION_COMMENT,
	payload: {
		data
	},
});

export const addCollabConversationCommentRequest = () => ({
  type: actionType.ADD_COLLAB_CONVERSATION_COMMENT_REQUEST,
  payload: {},
})

export const addCollabConversationCommentSuccess = (data: any) => ({
	type: actionType.ADD_COLLAB_CONVERSATION_COMMENT_SUCCESS,
	payload: {
		data
	},
});