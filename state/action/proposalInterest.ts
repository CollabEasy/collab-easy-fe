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

export const getProposalsInterestsFailure = () => ({
    type: actionType.FETCH_ALL_PROPOSAL_INTERESTS_FAILURE,
    payload: {
       
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

export const acceptProposalInterest = (proposalId: string, data: any) => ({
    type: actionType.ACCEPT_PROPOSAL_INTEREST,
    payload: {
        proposalId,
        data
    },
});

export const acceptProposalInterestRequest = () => ({
    type: actionType.ACCEPT_PROPOSAL_INTEREST_REQUEST,
    payload: {},
})

export const acceptProposalInterestSuccess = (data: any) => ({
    type: actionType.ACCEPT_PROPOSAL_INTEREST_FAILURE,
    payload: {
        data
    },
});

export const rejectProposalInterest = (proposalId: string, data: any) => ({
    type: actionType.REJECT_PROPOSAL_INTEREST,
    payload: {
        proposalId,
        data
    },
});

export const rejectProposalInterestRequest = () => ({
    type: actionType.REJECT_PROPOSAL_INTEREST_REQUEST,
    payload: {},
})

export const rejectProposalInterestSuccess = (data: any) => ({
    type: actionType.REJECT_PROPOSAL_INTEREST_FAILURE,
    payload: {
        data
    },
});

export const setShowProposalInterestedArtistModal = (show: boolean) => ({
    type: actionType.SHOW_PROPOSAL_INTERESTED_ARTIST_MODAL,
    payload: {
        show
    },
});
