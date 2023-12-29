import * as actionType from '../actionTypes/inspoActionTypes';

export const setShowNewInspoSubmissionModal = (show: boolean) => ({
	type: actionType.SET_SHOW_NEW_INSPO_SUBMISSION_MODAL,
	payload: {
		show
	}
});