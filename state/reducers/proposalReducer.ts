import { ProposalState } from "types/states";
import * as actionType from "../actionTypes/proposalActionTypes";

const initialState: ProposalState = {
    proposals: [],
    proposalCount: -1,
    isAddingProposal: false,
    isfetchingProposal: false,
    isFetchingAllProposals: false,
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

        case actionType.ADD_PROPOSAL_REQUEST:
            return {
                ...state,
                isAddingProposal: true,
            };
        case actionType.ADD_PROPOSAL_SUCCESS:
            let updatedProposals = []
            if (state.proposals.length > 0) {
                const oldProposals= state.proposals[0]["data"];
                oldProposals.forEach((proposal, index) => {
                    updatedProposals.push(proposal);
                });
            }
            updatedProposals.push(action.payload.data["data"]);
            return {
                ...state,
                proposals:  [{"data": updatedProposals}],
                proposalCount: updatedProposals.length,
                isAddingProposal: false,
            };

        case actionType.ADD_PROPOSAL_FAILURE:
            return {
                ...state,
                isAddingProposal: false,
            };
        default:
            return state;
    }
};

export default proposalReducer;
