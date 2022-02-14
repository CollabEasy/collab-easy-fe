import { User } from "types/model/user";
import * as actionType from '../actionTypes/userActionTypes';


export const fetchUserDataAction = (id: string) => ({
  type: actionType.FETCH_USER_DATA,
  payload: {
    id,
  },
});

export const setUserDataAction = (data: User) => ({
  type: actionType.SET_USER_DATA,
  payload: {
    data
  }
})

export const setUserLoggedIn = (data: any) => ({
  type: actionType.SET_USER_LOGGED_IN,
  payload: {
    data,
  },
});

export const userLoginFailure = (data: any) => ({
  type: actionType.USER_LOGIN_FAILURE,
  payload: {
    data,
  }
})

export const userLoginRequest = () => ({
  type: actionType.USER_LOGIN_REQUEST,
})

export const updateArtistProfile = (data: User) => ({
  type: actionType.UPDATE_ARTIST_PROFILE,
  payload: {
    data
  }
});

export const updateArtistProfileRequest = () => ({
  type: actionType.UPDATE_ARTIST_PROFILE_REQUEST,
  payload: {},
})

export const updateArtistProfileSuccess = (data: User) => ({
  type: actionType.USER_DETAILS_UPDATED,
  payload: {
    data
  }
});

export const fetchArtistSkillSuccess = (data: any) => ({
  type: actionType.USER_SKILLS_FETCHED,
  payload: {
    data
  }
});

export const fetchUserByHandle = (handle: string) => ({
  type: actionType.FETCH_USER_BY_HANDLE,
  payload: {
    data: handle,
  }
});

export const fetchUserByHandleSuccess = (data: User) => ({
  type: actionType.FETCH_USER_BY_HANDLE_SUCCESS,
  payload: {
    data,
  }
})

export const resetUserLoggedIn = () => ({
  type: actionType.RESET_USER_LOGGED_IN
});

export const fetchArtistCategoriesData = () => ({
  type: actionType.FETCH_ARTIST_CATEGORIES_DATA,
  payload: {},
});

export const setArtistCategoriesData = (data: any) => ({
  type: actionType.SET_ARTIST_CATEGORIES_DATA,
  payload: {
    data
  }
})

export const updateArtistArt = (data: any) => ({
	type: actionType.UPDATE_ARTIST_ART,
	payload: {
		data
	},
});

export const updateArtistArtSuccess = (data: any) => ({
	type: actionType.UPDATE_ARTIST_ART_SUCCESS,
	payload: {
			data
	},
});

export const fetchArtistSkills = () => ({
	type: actionType.FETCH_ARTIST_SKILLS,
	payload: {},
});

export const fetchArtistPreferences = () => ({
	type: actionType.FETCH_ARTIST_PREFERENCES,
	payload: {},
});

export const fetchArtistPreferencesSuccess = (data: any) => ({
	type: actionType.FETCH_ARTIST_PREFERENCES_SUCCESS,
	payload: {
		data
	},
})

export const updateArtistPreferenceRequest = (key: string) => ({
	type: actionType.UPDATE_ARTIST_PREFERENCE_REQUEST,
	payload: {
		key, 
	}
});

export const updateArtistPreference = (key: string, value: any) => ({
	type: actionType.UPDATE_ARTIST_PREFERENCE,
	payload: {
		key, 
		value,
	}
});

export const updateArtistPreferenceSuccess = (key: string, value: any) => ({
	type: actionType.UPDATE_ARTIST_PREFERENCE_SUCCESS,
	payload: {
		key, 
		value,
	}
});
