import * as actionType from '../actionTypes/proposalInterestTypes';

export const getProposalsInterests = (proposalId: string) => ({
    type: actionType.FETCH_ALL_PROPOSAL_INTERESTS,
    payload: {
        proposalId
    },
});


export const getProposalsInterestsRequest = () => ({
    type: actionType.FETCH_ALL_PROPOSAL_INTERESTS_REQUEST,
    payload: {},
});

export const getProposalsInterestsSuccess = (data: any) => ({
    type: actionType.FETCH_ALL_PROPOSAL_INTERESTS_SUCCESS,
    payload: {
        data
    },
});

export const addProposalInterest = (proposalId: string, data: any) => ({
    type: actionType.ADD_PROPOSAL_INTEREST,
    payload: {
        proposalId,
        data
    },
});

export const addProposalInterestRequest = () => ({
    type: actionType.ADD_PROPOSAL_INTEREST_REQUEST,
    payload: {},
})

export const addProposalInterestSuccess = (data: any) => ({
    type: actionType.ADD_PROPOSAL_INTEREST_SUCCESS,
    payload: {
        data
    },
});

