import * as actionType from "../actionTypes/contestActionTypes";
import { ContestState } from "types/states";

const initialState: ContestState = {
    isFetchingContest: false,
    isUpdatingContest: false,
    contest: [],
    showContestModal: false,
};

const contestReducer = (state = initialState, action): ContestState => {
    switch (action.type) {
        case actionType.FETCH_CONTEST:
            return {
                ...state,
                contest: [],
                isFetchingContest: true,
            };
        case actionType.FETCH_CONTEST_REQUEST:

            return {
                ...state,
                contest: action.payload.data,
                isFetchingContest: false,
            };
        case actionType.FETCH_CONTEST_SUCCESS:
            return {
                ...state,
                isFetchingContest: false,
            };

        case actionType.ADD_CONTEST:
            return {
                ...state,
                contest: [],
                isFetchingContest: false,
            };
        case actionType.ADD_CONTEST_REQUEST:
            return {
                ...state,
                contest: action.payload.data,
                isFetchingContest: false,
            };
        case actionType.ADD_CONTEST_SUCCESS:
            return {
                ...state,
                isFetchingContest: false,
            };

        case actionType.SET_SHOW_CONTEST_MODAL:
            return {
                ...state,
                showContestModal: action.payload.show,
            }
        default:
            return state;
    }
};

export default contestReducer;
