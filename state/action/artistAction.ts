export const FETCH_ARTIST_CATEGORIES_DATA = 'ARTIST/FETCH_ARTIST_DATA'
export const SET_ARTIST_CATEGORIES_DATA = 'ARTIST/SET_ARTIST_CATEGORIES_DATA'
export const UPDATE_ARTIST_ART = 'UPDATE_ARTIST_ART'
export const UPDATE_ARTIST_ART_SUCCESS = 'UPDATE_ARTIST_ART_SUCCESS'
export const FETCH_ARTIST_SKILLS = 'FETCH_ARTIST_SKILLS'

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
