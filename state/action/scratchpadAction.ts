import * as actionType from '../actionTypes/scratchpadActionTypes';

export const fetchScratchpadByArtistId = () => ({
  type: actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID,
  payload: {}
})

export const fetchScratchpadByArtistIdRequest = () => ({
  type: actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID_REQUEST,
  payload: {}
})

export const fetchScratchpadByArtistIdSuccess = (data: any) => ({
  type: actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID_SUCCESS,
  payload: {
    data
  }
})

export const updateArtistScratchpad = (data: string) => ({
	type: actionType.UPDATE_ARTIST_SCRATCHPAD,
	payload: {
		data
	},
});

export const updateArtistScratchpadRequest = () => ({
  type: actionType.UPDATE_ARTIST_SCRATCHPAD_REQUEST,
  payload: {},
})

export const updateArtistScratchpadSuccess = (data: string) => ({
	type: actionType.UPDATE_ARTIST_SCRATCHPAD_SUCCESS,
	payload: {
			data
	},
});