import * as actionType from "../actionTypes/contestActionTypes";
import { ContestSubmissionState } from "types/states";

const initialState: ContestSubmissionState = {
    isFetchingSubmission: false,
    submission: [],
};

const contestSubmissionReducer = (state = initialState, action): ContestSubmissionState => {
    switch (action.type) {
        case actionType.FETCH_ARTIST_SUBMISSION:
            return {
                ...state,
                submission: [],
                isFetchingSubmission : true,
            };
        case actionType.FETCH_ARTIST_SUBMISSION_SUCCESS:
            return {
                ...state,
                submission: action.payload.data,
                isFetchingSubmission: false,
            };
        case actionType.FETCH_ARTIST_SUBMISSION_FAILURE:
            return {
                ...state,
                isFetchingSubmission: false,
            };
        
        default:
            return state;
    }
};

export default contestSubmissionReducer;
