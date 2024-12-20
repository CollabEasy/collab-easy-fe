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

export const fetchContestSubmissions = (slug: string) => ({
    type: actionType.FETCH_CONTEST_SUBMISSIONS,
    payload: {
        slug,
    }
})

export const fetchContestSubmissionsRequest = () => ({
    type: actionType.FETCH_CONTEST_SUBMISSIONS_REQUEST,
    payload: {}
})

export const fetchContestSubmissionsSuccess = (data: any[]) => ({
    type: actionType.FETCH_CONTEST_SUBMISSIONS_SUCCESS,
    payload: {
        data
    }
})

export const upvoteContestSubmission = (data: any) => ({
    type: actionType.UPVOTE_CONTEST_SUBMISSION,
    payload: {
        data,
    }
})

export const upvoteContestSubmissionRequest = () => ({
    type: actionType.UPVOTE_CONTEST_SUBMISSION_REQUEST,
    payload: {}
})

export const upvoteContestSubmissionSuccess = (data: any) => ({
    type: actionType.UPVOTE_CONTEST_SUBMISSION_SUCCESS,
    payload: {
        data
    }
})

export const fetchContestSubmissionArtistVotes = (slug: string) => ({
    type: actionType.FETCH_CONTEST_SUBMISSIONS_ARTIST_VOTES,
    payload: {
        slug,
    }
})

export const fetchContestSubmissionArtistVotesRequest = () => ({
    type: actionType.FETCH_CONTEST_SUBMISSIONS_ARTIST_VOTES_REQUEST,
    payload: {}
})

export const fetchContestSubmissionArtistVotesSuccess = (data: any[]) => ({
    type: actionType.FETCH_CONTEST_SUBMISSIONS_ARTIST_VOTES_SUCCESS,
    payload: {
        data
    }
})



export const addContestArtwork = (formData: FormData, contestSlug: string) => {
    return {
    type: actionType.ADD_CONTEST_ARTWORK,
    payload: {
        data: formData,
        contest: contestSlug,
    }
}
};

export const addContestArtworkRequest = () => ({
    type: actionType.ADD_CONTEST_ARTWORK_REQUEST,
    payload: {}
})

export const addContestArtworkSuccess = () => ({
    type: actionType.ADD_CONTEST_ARTWORK_SUCCESS,
})

export const addContestArtworkFailure = (data: any[]) => ({
    type: actionType.ADD_CONTEST_ARTWORK_FAILURE,
    payload: {}
})
