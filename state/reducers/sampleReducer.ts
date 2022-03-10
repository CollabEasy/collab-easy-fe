import * as actionType from "../actionTypes/sampleActionTypes";
import { UserSampleState } from "types/states/sample";

const initialState: UserSampleState = {
  isFetchingSamples: false,
  isUploading: false,
  isUploaded: false,
  isDeleting: false,
  isDeleted: false,
  samples: [],
};
const sampleReducer = (state = initialState, action): UserSampleState => {
  switch (action.type) {
    case actionType.UPLOAD_SAMPLE_WORK_REQUEST:
      return {
        ...state,
        isUploading: true,
      };
    case actionType.UPLOAD_SAMPLE_WORK_SUCCESS:
      const snew = [action.payload.data, ...state.samples.slice(0)];
      return {
        ...state,
        samples: [action.payload.data.data].concat(...state.samples),
        isUploading: false,
        isUploaded: true,
      };
    case actionType.UPLOAD_SAMPLE_WORK_FAILURE:
      return {
        ...state,
        isUploading: false,
        isUploaded: false,
      };
    case actionType.CLEAR_UPLOAD_SAMPLE_WORK:
      return {
        ...state,
        isUploading: false,
        isUploaded: false,
      };
    case actionType.FETCH_SAMPLE_WORK_REQUEST:
      return {
        ...state,
        isFetchingSamples: true,
      };
    case actionType.FETCH_SAMPLE_WORK_SUCCESS:
      return {
        ...state,
        isFetchingSamples: false,
        samples: action.payload.data.data.artList,
      };
    case actionType.FETCH_SAMPLE_WORK_FAILURE:
      return {
        ...state,
        isFetchingSamples: false,
      };
    case actionType.CLEAR_DELETE_SAMPLE_WORK:
      return {
        ...state,
        isDeleted: false,
        isDeleting: false,
      };
    case actionType.DELETE_SAMPLE_WORK_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case actionType.DELETE_SAMPLE_WORK_SUCCESS:
      const data = action.payload.data;
      const newSamples = [];
      const oldSamples = state.samples;
      oldSamples.forEach((sample, index) => {
        if (sample.originalUrl !== data.originalUrl) {
          newSamples.push(sample);
        }
      });
      return {
        ...state,
        samples: newSamples,
        isDeleting: false,
        isDeleted: true,
      };
    case actionType.DELETE_SAMPLE_WORK_REQUEST:
      return {
        ...state,
        isDeleting: false,
        isDeleted: false,
      };
    default:
      return state;
  }
};

export default sampleReducer;
