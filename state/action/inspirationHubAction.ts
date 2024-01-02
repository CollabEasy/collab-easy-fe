import * as actionType from '../actionTypes/inspirationHubActionTypes';

export const setShowAddInspirationThemeModal = (show: boolean) => ({
	type: actionType.SHOW_ADD_INSPIRATION_THEME_MODAL,
	payload: {
		show
	}
});