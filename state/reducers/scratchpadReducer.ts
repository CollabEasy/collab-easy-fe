import * as actionType from "../actionTypes/scratchpadActionTypes";
import { ScratchpadState } from "types/states/scratchpad";

const initialState: ScratchpadState = {
    isFetchingScratchpad: false,
    scratchpad: "",
};

const scratchpadReducer = (state = initialState, action): ScratchpadState => {
  switch (action.type) {
    case actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID:
      return {
        ...state,
        scratchpad: "",
        isFetchingScratchpad: true,
      };
    case actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID_SUCCESS:
      console.log("Rabbal is scratchpad reducer ");
      console.log(action.payload);
      return {
        ...state,
        scratchpad: action.payload.data.data,
        isFetchingScratchpad: false,
      };
    case actionType.FETCH_SCRATCHPAD_BY_ARTIST_ID_FAILURE:
      return {
        ...state,
        isFetchingScratchpad: false,
      };
    default:
      return state;
  }
};

export default scratchpadReducer;
