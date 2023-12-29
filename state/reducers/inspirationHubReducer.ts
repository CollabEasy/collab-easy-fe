import { InspirationHubState } from "types/states/inspirationHubState";
import * as actionType from "../actionTypes/inspirationHubActionTypes";

const initialState: InspirationHubState = {
  showNewInspoSubmissionModal: false
};

const inspirationHubReducer = (state = initialState, action): InspirationHubState => {
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

export default inspirationHubReducer;
