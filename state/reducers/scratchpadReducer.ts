import * as actionType from "../actionTypes/scratchpadActionTypes";
import { ScratchpadState } from "types/states/scratchpad";

const initialState: ScratchpadState = {
  isFetchingScratchpad: false,
  isUpdatingScratchpad: false,
  scratchpad: {
    content: "",
  },
};

const scratchpadReducer = (state = initialState, action): ScratchpadState => {
  switch (action.type) {
    case actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID:
      return {
        ...state,
        scratchpad: { content: "" },
        isFetchingScratchpad: true,
      };
    case actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID_SUCCESS:
      const content =
        (action.payload.data.data == null || action.payload.data.data.content === null)
          ? ""
          : action.payload.data.data.content;
      return {
        ...state,
        scratchpad: {
          content: content,
        },
        isFetchingScratchpad: false,
      };
    case actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID_FAILURE:
      return {
        ...state,
        isFetchingScratchpad: false,
      };

    case actionType.UPDATE_ARTIST_SCRATCHPAD_REQUEST:
      return {
        ...state,
        isUpdatingScratchpad: true,
      };
    case actionType.UPDATE_ARTIST_SCRATCHPAD_SUCCESS:
      return {
        ...state,
        isUpdatingScratchpad: false,
        scratchpad: {
          content: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default scratchpadReducer;
