import { ProposalInterestState } from "types/states";
import * as actionType from "../actionTypes/proposalInterestTypes";

const initialState: ProposalInterestState = {
    proposalInterests: [],
    proposalInterestsCount: 0,
    isAddingProposalInterest: false,
    isFetchingProposalsInterests: false
};

const proposalInterest = (state = initialState, action): ProposalInterestState => {
    switch (action.type) {

        case actionType.FETCH_ALL_PROPOSAL_INTERESTS:
            return {
                ...state,
                proposalInterests: [],
                isFetchingProposalsInterests: true,
            };
        case actionType.FETCH_ALL_PROPOSAL_INTERESTS_SUCCESS:
            return {
                ...state,
                proposalInterests: action.payload.data,
                proposalInterestsCount: action.payload.data[0].data.length,
                isFetchingProposalsInterests: false,
            };
        case actionType.FETCH_ALL_PROPOSAL_INTERESTS_FAILURE:
            return {
                ...state,
                isFetchingProposalsInterests: false,
            };

        case actionType.ADD_PROPOSAL_INTEREST:
            return {
                ...state,
                isAddingProposalInterest: true,
            };
        case actionType.ADD_PROPOSAL_INTEREST_SUCCESS:
            let allProposals = []
            if (state.proposalInterests.length > 0) {
                const oldProposals = state.proposalInterests[0]["data"];
                oldProposals.forEach((proposal, index) => {
                    allProposals.push(proposal);
                });
            }
            allProposals.push(action.payload.data["data"]);
            return {
                ...state,
                proposalInterests: [{ "data": allProposals }],
                proposalInterestsCount: allProposals.length,
                isAddingProposalInterest: false,
            };

        case actionType.ADD_PROPOSAL_INTEREST_FAILURE:
            return {
                ...state,
                isAddingProposalInterest: false,
            };

        default:
            return state;
    }
};

export default proposalInterest;
