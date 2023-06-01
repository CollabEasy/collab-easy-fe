import * as actionType from "../actionTypes/contestActionTypes";
import { ContestSubmissionVoteState } from "types/states";

const initialState: ContestSubmissionVoteState = {
    isFetchingSubmissionVotes: false,
    artistSubmissionVotes: [],
};

const contestSubmissionVoteReducer = (state = initialState, action): ContestSubmissionVoteState => {
    switch (action.type) {
        case actionType.UPVOTE_CONTEST_SUBMISSION:
            return {
                ...state,
                isFetchingSubmissionVotes: true,
            };
        case actionType.UPVOTE_CONTEST_SUBMISSION_SUCCESS:
            let updatedContestSubmissionVotes = []
            if (state.artistSubmissionVotes.length > 0) {
                const oldVotes = state.artistSubmissionVotes[0]["data"];
                oldVotes.forEach((vote) => {
                    if (vote.submissionId !== action.payload.data[0].data.submissionId) {
                        updatedContestSubmissionVotes.push(vote);
                    }
                });
            }
            
            updatedContestSubmissionVotes.push(action.payload.data[0].data)
            return {
                ...state,
                artistSubmissionVotes: [{ "data": updatedContestSubmissionVotes }],
                isFetchingSubmissionVotes: false,
            };
        case actionType.UPVOTE_CONTEST_SUBMISSION_FAILURE:
            return {
                ...state,
                isFetchingSubmissionVotes: false,
            };

        case actionType.FETCH_CONTEST_SUBMISSIONS_ARTIST_VOTES:
            return {
                ...state,
                artistSubmissionVotes: [],
                isFetchingSubmissionVotes: true,
            };
        case actionType.FETCH_CONTEST_SUBMISSIONS_ARTIST_VOTES_SUCCESS:
            return {
                ...state,
                artistSubmissionVotes: action.payload.data,
                isFetchingSubmissionVotes: false,
            };
        case actionType.FETCH_CONTEST_SUBMISSIONS_ARTIST_VOTES_FAILURE:
            return {
                ...state,
                isFetchingSubmissionVotes: false,
            };


        default:
            return state;
    }
};

export default contestSubmissionVoteReducer;
