import * as actionType from "../actionTypes/rewardsTypes";
import { RewardsActivityState } from "types/states";

const initialState: RewardsActivityState = {
    isVerifyingRefferalCode: false,
    isFetchingRewardsActivity: false,
    isSkippingRefferalCode: false,
    isFetchingRewardsPoints: false,
    referralCodeCorrect: false,
    rewardsActivity: [],
    rewardPoints: {
        totalPoints: 0,
        lifetimePoints: 0
    },
};

const RewardsActivityReducer = (state = initialState, action): RewardsActivityState => {
    switch (action.type) {
        case actionType.FETCH_REWARDS:
            return {
                ...state,
                isFetchingRewardsPoints: true,
            };
        case actionType.FETCH_REWARDS_SUCCESS:
            return {
                ...state,
                rewardPoints: action.payload.data[0].data,
                isFetchingRewardsPoints: false,
            };
        case actionType.FETCH_REWARDS_FAILURE:
            return {
                ...state,
                isFetchingRewardsPoints: false,
            };

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

        case actionType.VERIFY_REFFERAL_CODE:
            return {
                ...state,
                isVerifyingRefferalCode: true,
            };
        case actionType.VERIFY_REFFERAL_CODE_SUCCESS:
            return {
                ...state,
                isFetchingRewardsActivity: false,
                referralCodeCorrect: true,
            };
        case actionType.VERIFY_REFFERAL_CODE_FAILURE:
            return {
                ...state,
                isVerifyingRefferalCode: false,
                referralCodeCorrect: false,
            };
        case actionType.SKIP_REFFERAL_CODE:
            return {
                ...state,
                isSkippingRefferalCode: true,
            };
        case actionType.SKIP_REFFERAL_CODE_SUCCESS:
            return {
                ...state,
                isSkippingRefferalCode: false,
            };
        case actionType.SKIP_REFFERAL_CODE_FAILURE:
            return {
                ...state,
                isSkippingRefferalCode: false,
            };

        default:
            return state;
    }
};

export default RewardsActivityReducer;
