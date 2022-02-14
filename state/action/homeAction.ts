import * as actionTypes from '../actionTypes/homeActionTypes';

export const homeAction = () => ({ type: actionTypes.HOME });

export const openLoginModalAction = () => ({ type: actionTypes.OPEN_LOGIN_MODAL });

export const closeLoginModalAction = () => ({ type: actionTypes.CLOSE_LOGIN_MODAL });

export const fetchLoginData = (token: string) => ({
	type: actionTypes.FETCH_LOGIN_DATA,
	payload: {
		token,
	},
});

export const updateLoginData = (loginData: any) => ({
	type: actionTypes.UPDATE_LOGIN_DATA,
	payload: {
		loginData,
	},
});
