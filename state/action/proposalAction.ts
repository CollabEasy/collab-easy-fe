import { ProposalData } from 'types/model';
import * as actionType from '../actionTypes/proposalActionTypes';

export const getAllProposals = () => ({
    type: actionType.FETCH_ALL_PROPOSALS,
    payload: {},
});


export const getAllProposalsRequest = () => ({
    type: actionType.FETCH_ALL_PROPOSALS_REQUEST,
    payload: {},
});

export const getAllProposalsSuccess = (data: any) => ({
    type: actionType.FETCH_ALL_PROPOSALS_SUCCESS,
    payload: {
        data
    },
});

export const addProposal = (data: any) => ({
    type: actionType.ADD_PROPOSAL,
    payload: {
        data
    },
});

export const addProposalRequest = () => ({
    type: actionType.ADD_PROPOSAL_REQUEST,
    payload: {},
})

export const addProposalSuccess = (data: any) => ({
    type: actionType.ADD_PROPOSAL_SUCCESS,
    payload: {
        data
    },
});

export const updateProposal = (proposalId: string, data: any) => ({
    type: actionType.UPDATE_PROPOSAL,
    payload: {
        proposalId,
        data
    },
});

export const updateProposalRequest = () => ({
    type: actionType.UPDATE_PROPOSAL_REQUEST,
    payload: {},
})

export const updateProposalSuccess = (data: any) => ({
    type: actionType.UPDATE_PROPOSAL_SUCCESS,
    payload: {
        data
    },
});

export const fetchProposalById = (id : string) => ({
    type: actionType.FETCH_PROPOSAL_BY_ID,
    payload: {
        id
    }
})

export const fetchProposalByIdRequest = () => ({
    type: actionType.FETCH_PROPOSAL_BY_ID_REQUEST,
    payload: {}
})

export const fetchProposalByIdSuccess = (data: any) => ({
    type: actionType.FETCH_PROPOSAL_BY_ID_SUCCESS,
    payload: {
        data
    }
})

export const fetchProposalByIdFalilure = (data: any) => ({
    type: actionType.FETCH_PROPOSAL_BY_ID_FAILURE,
    payload: {
        data
    }
})

export const fetchProposalByArtistSlug = (slug: string) => ({
    type: actionType.FETCH_PROPOSAL_BY_ARTIST_SLUG,
    payload: {
        slug,
    }
})

export const fetchProposalByArtistSlugRequest = () => ({
    type: actionType.FETCH_PROPOSAL_BY_ARTIST_SLUG_REQUEST,
    payload: {}
})

export const fetchProposalByArtistSlugSuccess = (data: any) => ({
    type: actionType.FETCH_PROPOSAL_BY_ARTIST_SLUG_SUCCESS,
    payload: {
        data
    }
})

export const fetchProposalByArtistSlugFalilure = (data: any) => ({
    type: actionType.FETCH_PROPOSAL_BY_ARTIST_SLUG_FAILURE,
    payload: {
        data
    }
})