import { InspirationHubState } from "types/states";
import * as actionType from "../actionTypes/inspirationHubActionTypes";

const initialState: InspirationHubState = {
    showAddInspirationThemeModal: false
};

const inspirationHubReducer = (state = initialState, action): InspirationHubState => {
    switch (action.type) {

        case actionType.SHOW_ADD_INSPIRATION_THEME_MODAL:
            return {
                ...state,
                showAddInspirationThemeModal: action.payload.show,
            }

        default:
            return state;
    }
};

export default inspirationHubReducer;
