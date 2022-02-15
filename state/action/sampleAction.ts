import * as actionTypes from "../actionTypes/sampleActionTypes";

export const uploadSample = (formData: FormData) => ({
    type: actionTypes.UPLOAD_SAMPLE_WORK,
    payload: {
        data: formData,
    }
});

export const uploadSampleWorkRequest = () => ({
    type: actionTypes.UPLOAD_SAMPLE_WORK_REQUEST,
    payload: {},
});

export const uploadSampleWorkSuccess = (data: any) => ({
    type: actionTypes.UPLOAD_SAMPLE_WORK_SUCCESS,
    payload: {
        data
    },
})

export const fetchArtistSamples = (slug: string) => ({
    type: actionTypes.FETCH_SAMPLE_WORK,
    payload: {
        slug: slug
    }
});

export const fetchArtistSamplesRequest = () => ({
    type: actionTypes.FETCH_SAMPLE_WORK_REQUEST,
    payload: {},
});

export const fetchArtistSamplesSuccess = (data: any) => ({
    type: actionTypes.FETCH_SAMPLE_WORK_SUCCESS,
    payload: {
        data
    },
})

export const clearUploadSampleState = () => ({
    type: actionTypes.CLEAR_UPLOAD_SAMPLE_WORK,
    payload: {},
})