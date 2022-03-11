import * as actionType from '../actionTypes/socialProspectusActionTypes';

export const fetchArtistSocialProspectus = () => ({
  type: actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS,
  payload: {}
})

export const fetchArtistSocialProspectusRequest = () => ({
  type: actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS_REQUEST,
  payload: {}
})

export const fetchArtistSocialProspectusSuccess = (data: []) => ({
  type: actionType.FETCH_ARTIST_SOCIAL_PROSPECTUS_SUCCESS,
  payload: {
    data
  }
})

export const updateArtistSocialProspectus = (data: []) => ({
	type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS,
	payload: {
		data
	},
});

export const updateArtistSocialProspectusRequest = () => ({
  type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_REQUEST,
  payload: {},
})

export const updateArtistSocialProspectusSuccess = (data: []) => ({
	type: actionType.UPDATE_ARTIST_SOCIAL_PROSPECTUS_SUCCESS,
	payload: {
		data
	},
});