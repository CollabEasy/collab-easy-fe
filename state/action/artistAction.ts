export const FETCH_ARTIST_CATEGORIES_DATA = 'ARTIST/FETCH_ARTIST_DATA'
export const SET_ARTIST_CATEGORIES_DATA = 'ARTIST/SET_ARTIST_CATEGORIES_DATA'
export const UPDATE_ARTIST_ART = 'UPDATE_ARTIST_ART'
export const UPDATE_ARTIST_ART_SUCCESS = 'UPDATE_ARTIST_ART_SUCCESS'
export const FETCH_ARTIST_SKILLS = 'FETCH_ARTIST_SKILLS'
export const UPDATE_ARTIST_PREFERENCE = 'UPDATE_ARTIST_PREFERENCE'
export const UPDATE_ARTIST_PREFERENCE_REQUEST = 'UPDATE_ARTIST_PREFERENCE_REQUEST'
export const UPDATE_ARTIST_PREFERENCE_SUCCESS = 'UPDATE_ARTIST_PREFERENCE_SUCCESS'
export const FETCH_ARTIST_PREFERENCES = 'FETCH_ARTIST_PREFERENCES';
export const FETCH_ARTIST_PREFERENCES_SUCCESS = 'FETCH_ARTIST_PREFERENCES_SUCCESS'

export const fetchArtistCategoriesData = () => ({
  type: FETCH_ARTIST_CATEGORIES_DATA,
  payload: {},
});

export const setArtistCategoriesData = (data: any) => ({
  type: SET_ARTIST_CATEGORIES_DATA,
  payload: {
    data
  }
})

export const updateArtistArt = (data: any) => ({
	type: UPDATE_ARTIST_ART,
	payload: {
		data
	},
});

export const updateArtistArtSuccess = (data: any) => ({
	type: UPDATE_ARTIST_ART_SUCCESS,
	payload: {
			data
	},
});

export const fetchArtistSkills = () => ({
	type: FETCH_ARTIST_SKILLS,
	payload: {},
});

export const fetchArtistPreferences = () => ({
	type: FETCH_ARTIST_PREFERENCES,
	payload: {},
});

export const fetchArtistPreferencesSuccess = (data: any) => ({
	type: FETCH_ARTIST_PREFERENCES_SUCCESS,
	payload: {
		data
	},
})

export const updateArtistPreferenceRequest = (key: string) => ({
	type: UPDATE_ARTIST_PREFERENCE_REQUEST,
	payload: {
		key, 
	}
});

export const updateArtistPreference = (key: string, value: any) => ({
	type: UPDATE_ARTIST_PREFERENCE,
	payload: {
		key, 
		value,
	}
});

export const updateArtistPreferenceSuccess = (key: string, value: any) => ({
	type: UPDATE_ARTIST_PREFERENCE_SUCCESS,
	payload: {
		key, 
		value,
	}
});