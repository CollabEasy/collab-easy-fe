import * as actionType from "../actionTypes/rewardsTypes";
import { RewardsActivityState } from "types/states";

const initialState: RewardsActivityState = {
    isFetchingRewardsActivity: false,
    rewardsActivity: [],
};

const RewardsActivityReducer = (state = initialState, action): RewardsActivityState => {
    switch (action.type) {
        case actionType.FETCH_REWARDS_ACTIVITY:
            return {
                ...state,
                rewardsActivity: [],
                isFetchingRewardsActivity: true,
            };
        case actionType.FETCH_REWARDS_ACTIVITY_SUCCESS:
            return {
                ...state,
                rewardsActivity: action.payload.data,
                isFetchingRewardsActivity: false,
            };
        case actionType.FETCH_REWARDS_ACTIVITY_FAILURE:
            return {
                ...state,
                isFetchingRewardsActivity: false,
            };
        
        default:
            return state;
    }
};

export default RewardsActivityReducer;
