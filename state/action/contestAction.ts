import * as actionType from '../actionTypes/contestActionTypes';

export const fetchAllContests = () => ({
    type: actionType.FETCH_ALL_CONTESTS,
    payload: {}
})

export const fetchAllContestsRequest = () => ({
    type: actionType.FETCH_ALL_CONTESTS_REQUEST,
    payload: {}
})

export const fetchAllContestsSuccess = (data: any[]) => ({
    type: actionType.FETCH_ALL_CONTESTS_SUCCESS,
    payload: {
        data
    }
})


export const fetchContest = (slug: string) => ({
    type: actionType.FETCH_CONTEST,
    payload: {
        slug,
    }
})

export const fetchContestRequest = () => ({
    type: actionType.FETCH_CONTEST_REQUEST,
    payload: {}
})

export const fetchContestSuccess = (data: any) => ({
    type: actionType.FETCH_CONTEST_SUCCESS,
    payload: {
        data
    }
})

export const addContest = (data: any) => ({
    type: actionType.ADD_CONTEST,
    payload: {
        data
    },
});

export const addContestRequest = () => ({
    type: actionType.ADD_CONTEST_REQUEST,
    payload: {},
})

export const addContestSuccess = (data: any) => ({
    type: actionType.ADD_CONTEST_SUCCESS,
    payload: {
        data
    },
});

export const updateContest = (data: any) => ({
    type: actionType.UPDATE_CONTEST,
    payload: {
        data
    },
});

export const updateContestRequest = () => ({
    type: actionType.UPDATE_CONTEST_REQUEST,
    payload: {},
})

export const updateContestSuccess = (data: any) => ({
    type: actionType.UPDATE_CONTEST_SUCCESS,
    payload: {
        data
    },
});

export const setShowContestModal = (show: boolean) => ({
	type: actionType.SET_SHOW_CONTEST_MODAL,
	payload: {
		show
	}
});

export const fetchArtistSubmission = (slug: string) => ({
    type: actionType.FETCH_ARTIST_SUBMISSION,
    payload: {
        slug,
    }
})

export const fetchArtistSubmissionRequest = () => ({
    type: actionType.FETCH_ARTIST_SUBMISSION_REQUEST,
    payload: {}
})

export const fetchArtistSubmissionSuccess = (data: any[]) => ({
    type: actionType.FETCH_ARTIST_SUBMISSION_SUCCESS,
    payload: {
        data
    }
})