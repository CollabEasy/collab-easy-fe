import * as actionType from '../actionTypes/rewardsTypes';

export const fetchRewardsActivity = () => ({
    type: actionType.FETCH_REWARDS_ACTIVITY,
    payload: {}
})

export const fetchRewardsActivityRequest = () => ({
    type: actionType.FETCH_REWARDS_ACTIVITY_REQUEST,
    payload: {}
})

export const fetchRewardsActivitySuccess = (data: any[]) => ({
    type: actionType.FETCH_REWARDS_ACTIVITY_SUCCESS,
    payload: {
        data
    }
})


export const fetchRewards = () => ({
    type: actionType.FETCH_REWARDS,
    payload: {}
})

export const fetchRewardsRequest = () => ({
    type: actionType.FETCH_REWARDS_REQUEST,
    payload: {}
})

export const fetchRewardsSuccess = (data: any) => ({
    type: actionType.FETCH_REWARDS_SUCCESS,
    payload: {
        data
    }
})

export const verifyRefferalCode = (refferalCode: string) => ({
    type: actionType.VERIFY_REFFERAL_CODE,
    payload: {
        refferalCode,
    }
})

export const verifyRefferalCodeRequest = () => ({
    type: actionType.VERIFY_REFFERAL_CODE_REQUEST,
    payload: {}
})

export const verifyRefferalCodeSuccess = (data: any) => ({
    type: actionType.VERIFY_REFFERAL_CODE_SUCCESS,
    payload: {
        data
    }
})

export const skipRefferalCode = () => ({
    type: actionType.SKIP_REFFERAL_CODE,
    payload: {}
})

export const skipRefferalCodeRequest = () => ({
    type: actionType.SKIP_REFFERAL_CODE_REQUEST,
    payload: {}
})

export const skipRefferalCodeSuccess = (data: any) => ({
    type: actionType.SKIP_REFFERAL_CODE_SUCCESS,
    payload: {
        data
    }
})