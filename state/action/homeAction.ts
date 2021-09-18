export const HOME = "HOME";
export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
export const FETCH_LOGIN_DATA = "FETCH_LOGIN_DATA";

export const homeAction = () => ({ type: HOME });

export const openLoginModalAction = () => ({ type: OPEN_LOGIN_MODAL });

export const closeLoginModalAction = () => ({ type: CLOSE_LOGIN_MODAL });

export const fetchLoginData = (token: string) => ({
	type: FETCH_LOGIN_DATA,
	payload: {
		token,
	},
});
