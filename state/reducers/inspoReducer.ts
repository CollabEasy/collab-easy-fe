import { InspoState } from "types/states/inspoState";
import * as actionType from "../actionTypes/inspoActionTypes";

const initialState: InspoState = {
  showNewInspoSubmissionModal: false
};

const inspoReducer = (state = initialState, action): InspoState => {
    switch (action.type) {
        case actionType.SET_SHOW_NEW_INSPO_SUBMISSION_MODAL:
            return {
                ...state,
                showNewInspoSubmissionModal: action.payload.show,
            }

        default:
            return state;
    }
};

export default inspoReducer;
