import * as actionType from '../actionTypes/proposalCommentTypes';

export const fetchProposalCommentByProposalId = (proposalId: string) => ({
  type: actionType.FETCH_PROPOSAL_COMMENT_BY_PROPOSAL_ID,
  payload: {
    proposalId,
  }
})

export const fetchProposalCommentByProposalIdRequest = () => ({
  type: actionType.FETCH_PROPOSAL_COMMENT_BY_PROPOSAL_ID_REQUEST,
  payload: {}
})

export const fetchProposalCommentByProposalIdSuccess = (data: any[]) => ({
  type: actionType.FETCH_PROPOSAL_COMMENT_BY_PROPOSAL_ID_SUCCESS,
  payload: {
    data
  }
})

export const addProposalComment = (data: any) => ({
	type: actionType.ADD_PROPOSAL_COMMENT,
	payload: {
		data
	},
});

export const addProposalCommentRequest = () => ({
  type: actionType.ADD_PROPOSAL_COMMENT_REQUEST,
  payload: {},
})

export const addProposalCommentSuccess = (data: any) => ({
	type: actionType.ADD_PROPOSAL_COMMENT_SUCCESS,
	payload: {
		data
	},
});