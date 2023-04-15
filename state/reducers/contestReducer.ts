import * as actionType from "../actionTypes/contestActionTypes";
import { ContestState } from "types/states";

const initialState: ContestState = {
    isFetchingContest: false,
    isUpdatingContest: false,
    contest: [],
    allContest: 0,
    showContestModal: false,
};

const contestReducer = (state = initialState, action): ContestState => {
    switch (action.type) {
        case actionType.FETCH_ALL_CONTESTS:
            return {
                ...state,
                contest: [],
                isFetchingContest: true,
            };
        case actionType.FETCH_ALL_CONTESTS_SUCCESS:
            return {
                ...state,
                contest: action.payload.data,
                allContest: action.payload.data[0].data.length,
                isFetchingContest: false,
            };
        case actionType.FETCH_ALL_CONTESTS_FAILURE:
            return {
                ...state,
                isFetchingContest: false,
            };

        case actionType.FETCH_CONTEST:
            return {
                ...state,
                contest: [],
                isFetchingContest: true,
            };
        case actionType.FETCH_CONTEST_SUCCESS:

            return {
                ...state,
                contest: [action.payload.data],
                isFetchingContest: false,
            };
        case actionType.FETCH_CONTEST_FAILURE:
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
        case actionType.ADD_CONTEST_SUCCESS:
            return {
                ...state,
                contest: action.payload.data,
                isFetchingContest: false,
            };
        case actionType.ADD_CONTEST_FAILURE:
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
