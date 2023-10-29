import { ProposalQuestionAnswers } from "types/states";
import * as actionType from "../actionTypes/proposalQuestionAnswerTypes";

const initialState: ProposalQuestionAnswers = {
    proposalQuestionAnswers: [],
    isFetchingPrpoposalQuestionAnswer: false,
    isAddingProposalQuestion: false
};

const proposalQuestionAnswer = (state = initialState, action): ProposalQuestionAnswers => {
    switch (action.type) {

        case actionType.FETCH_PROPOSAL_ALL_QUESTIONS_BY_PROPOSAL_ID:
            return {
                ...state,
                isFetchingPrpoposalQuestionAnswer: true,
            };
        case actionType.FETCH_PROPOSAL_ALL_QUESTIONS_BY_PROPOSAL_ID_SUCCESS:
            return {
                ...state,
                proposalQuestionAnswers: action.payload.data,
                isFetchingPrpoposalQuestionAnswer: false,
            };

        case actionType.FETCH_PROPOSAL_ALL_QUESTIONS_BY_PROPOSAL_ID_FAILURE:
            return {
                ...state,
                isFetchingPrpoposalQuestionAnswer: false,
            };

        case actionType.ADD_PROPOSAL_QUESTION:
            return {
                ...state,
                isAddingProposalQuestion: true,
            };
        case actionType.ADD_PROPOSAL_QUESTION_SUCCESS:
            console.log(state.proposalQuestionAnswers);
            return {
                ...state,
                proposalQuestionAnswers: [],
                isAddingProposalQuestion: false,
            };

        case actionType.ADD_PROPOSAL_QUESTION_FAILURE:
            return {
                ...state,
                isAddingProposalQuestion: false,
            };

        default:
            return state;
    }
};

export default proposalQuestionAnswer;
