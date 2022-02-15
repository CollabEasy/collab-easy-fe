import * as actionType from "../actionTypes/sampleActionTypes";
import { UserSampleState } from "types/states/sample"

const initialState: UserSampleState = {
    isFetchingSamples: false,
    isUploading: false,
    isUploaded: false,
    samples: [],
}
const sampleReducer = (state = initialState, action): UserSampleState => {
    switch (action.type) {
        case actionType.UPLOAD_SAMPLE_WORK_REQUEST:
            return {
                ...state,
                isUploading: true
            }
        case actionType.UPLOAD_SAMPLE_WORK_SUCCESS:
            return {
                ...state,
                isUploading: false,
                isUploaded: true,
            }
        case actionType.CLEAR_UPLOAD_SAMPLE_WORK:
            return {
                ...state,
                isUploading: false,
                isUploaded: false,
            }
        case actionType.FETCH_SAMPLE_WORK_REQUEST:
            return {
                ...state,
                isFetchingSamples: true,
            }
        case actionType.FETCH_SAMPLE_WORK_SUCCESS:
            console.log('data  : ",', action.payload.data.data);
            return {
                ...state,
                isFetchingSamples: false,
                samples: action.payload.data.data.artList,
            }
        default:
            return state;
    }
}

export default sampleReducer