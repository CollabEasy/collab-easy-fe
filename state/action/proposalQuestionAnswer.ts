import * as actionType from '../actionTypes/proposalQuestionAnswerTypes';

export const fetchProposalQuestionsByProposalId = (collabId: string) => ({
  type: actionType.FETCH_PROPOSAL_ALL_QUESTIONS_BY_PROPOSAL_ID,
  payload: {
      collabId,
  }
})

export const fetchProposalQuestionsByProposalIdRequest = () => ({
  type: actionType.FETCH_PROPOSAL_ALL_QUESTIONS_BY_PROPOSAL_ID_REQUEST,
  payload: {}
})

export const fetchProposalQuestionsByProposalIdSuccess = (data: any[]) => ({
  type: actionType.FETCH_PROPOSAL_ALL_QUESTIONS_BY_PROPOSAL_ID_SUCCESS,
  payload: {
      data
  }
})

export const addProposalQuestion = (proposalId: string, data: any) => ({
  type: actionType.ADD_PROPOSAL_QUESTION,
  payload: {
      proposalId,
      data
  },
});

export const addProposalQuestionRequest = () => ({
  type: actionType.ADD_PROPOSAL_ANSWER_REQUEST,
  payload: {},
})

export const addProposalQuestionSuccess = (data: any) => ({
  type: actionType.ADD_PROPOSAL_QUESTION_SUCCESS,
  payload: {
      data,
  },
})