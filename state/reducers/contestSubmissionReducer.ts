import * as actionType from "../actionTypes/contestActionTypes";
import { ContestSubmissionState } from "types/states";

const initialState: ContestSubmissionState = {
    isFetchingSubmissions: false,
    isFetchingArtistSubmission: false,
    isFetchingSubmissionVotes: false,
    allSubmissions: [],
    artistSubmission: [],
    artistSubmissionVotes: [],
};

const contestSubmissionReducer = (state = initialState, action): ContestSubmissionState => {
    switch (action.type) {
        case actionType.FETCH_ARTIST_SUBMISSION:
            return {
                ...state,
                artistSubmission: [],
                isFetchingArtistSubmission: true,
            };
        case actionType.FETCH_ARTIST_SUBMISSION_SUCCESS:
            return {
                ...state,
                artistSubmission: action.payload.data,
                isFetchingArtistSubmission: false,
            };
        case actionType.FETCH_ARTIST_SUBMISSION_FAILURE:
            return {
                ...state,
                isFetchingArtistSubmission: false,
            };

        case actionType.FETCH_CONTEST_SUBMISSIONS:
            return {
                ...state,
                allSubmissions: [],
                isFetchingSubmissions: true,
            };
        case actionType.FETCH_CONTEST_SUBMISSIONS_SUCCESS:
            return {
                ...state,
                allSubmissions: action.payload.data,
                isFetchingSubmissions: false,
            };
        case actionType.FETCH_CONTEST_SUBMISSIONS_FAILURE:
            return {
                ...state,
                isFetchingSubmissions: false,
            };

        default:
            return state;
    }
};

export default contestSubmissionReducer;
