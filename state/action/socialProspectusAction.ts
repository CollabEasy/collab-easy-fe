import * as actionType from '../actionTypes/socialProspectusActionTypes';

export const fetchArtistSocialProspectus = () => ({
  type: actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS,
  payload: {}
})

export const fetchArtistSocialProspectusRequest = () => ({
  type: actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS_REQUEST,
  payload: {}
})

export const fetchArtistSocialProspectusSuccess = (data: any[]) => ({
  type: actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS_SUCCESS,
  payload: {
    data
  }
})

export const updateArtistSocialProspectus = (data: any) => ({
	type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS,
	payload: {
		data
	},
});

export const updateArtistSocialProspectusRequest = () => ({
  type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_REQUEST,
  payload: {},
})

export const updateArtistSocialProspectusSuccess = (data: any) => ({
	type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_SUCCESS,
	payload: {
		data
	},
});

export const updateArtistSocialProspectus = (data: any) => ({
	type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS,
	payload: {
		data
	},
});

export const updateArtistSocialProspectusRequest = () => ({
  type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_REQUEST,
  payload: {},
})

export const updateArtistSocialProspectusSuccess = (data: any) => ({
	type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_SUCCESS,
	payload: {
		data
	},
});