import { ProposalState } from "types/states";
import * as actionType from "../actionTypes/proposalActionTypes";

const initialState: ProposalState = {
    proposal: [],
    proposals: [],
    proposalCount: -1,
    isAddingProposal: false,
    isfetchingProposal: false,
    isFetchingAllProposals: false,
    showCreateOrUpdateProposalModal: false,
};

const proposalReducer = (state = initialState, action): ProposalState => {
    switch (action.type) {

        case actionType.FETCH_ALL_PROPOSALS_REQUEST:
            return {
                ...state,
                proposals: [],
                isFetchingAllProposals: true,
            };
        case actionType.FETCH_ALL_PROPOSALS_SUCCESS:
            return {
                ...state,
                proposals: action.payload.data,
                proposalCount: action.payload.data[0].data.length,
                isFetchingAllProposals: false,
            };
        case actionType.FETCH_ALL_PROPOSALS_FAILURE:
            return {
                ...state,
                isFetchingAllProposals: false,
            };

        case actionType.FETCH_PROPOSAL_BY_ID_REQUEST:
            return {
                ...state,
                proposal: [],
                isfetchingProposal: true,
            };
        case actionType.FETCH_PROPOSAL_BY_ID_SUCCESS:
            return {
                ...state,
                proposal: [action.payload.data],
                isfetchingProposal: false,
            };
        case actionType.FETCH_PROPOSAL_BY_ID_FAILURE:
            return {
                ...state,
                isfetchingProposal: false,
            };

        case actionType.ADD_PROPOSAL_REQUEST:
            return {
                ...state,
                isAddingProposal: true,
            };
        case actionType.ADD_PROPOSAL_SUCCESS:
            let allProposals = []
            if (state.proposals.length > 0) {
                const oldProposals = state.proposals[0]["data"];
                oldProposals.forEach((proposal, index) => {
                    allProposals.push(proposal);
                });
            }
            allProposals.push(action.payload.data["data"]);
            return {
                ...state,
                proposals: [{ "data": allProposals }],
                proposalCount: allProposals.length,
                isAddingProposal: false,
            };

        case actionType.ADD_PROPOSAL_FAILURE:
            return {
                ...state,
                isAddingProposal: false,
            };

        case actionType.UPDATE_PROPOSAL_REQUEST:
            return {
                ...state,
                isAddingProposal: true,
            };
        case actionType.UPDATE_PROPOSAL_SUCCESS:
            let updatedProposal = state.proposal;
            updatedProposal[0].data["proposal"] = action.payload.data["data"];
            return {
                ...state,
                proposal: updatedProposal,
                isAddingProposal: false,
            };

        case actionType.UPDATE_PROPOSAL_FAILURE:
            return {
                ...state,
                isAddingProposal: false,
            };

        case actionType.SHOW_CREATE_OR_UPDATE_PROPOSAL_MODAL:
            return {
                ...state,
                showCreateOrUpdateProposalModal: action.payload.show,
            }

        default:
            return state;
    }
};

export default proposalReducer;
