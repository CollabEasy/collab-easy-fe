import { HOME, OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, UPDATE_ARTIST_ART_SUCCESS } from "state/action";
import { HomeState } from "types/states";

const initialState: HomeState = {
  homeDetails: {},
  loginModalDetails: {
    openModal: false,
  },
  artistListDetails: {}
};

const homeReducer = (state = initialState, action): HomeState => {
  switch (action.type) {
    case HOME:
      return {
        ...state,
        homeDetails: {
          dummyData: [
            { name: "Atul", id: 1 },
            { name: "Rahul", id: 3 },
            { name: "Ekta", id: 2 },
          ],
        },
      };
    case OPEN_LOGIN_MODAL:
      return { ...state, loginModalDetails: { openModal: true } };
    case CLOSE_LOGIN_MODAL:
      return { ...state, loginModalDetails: { openModal: false } };
    case UPDATE_ARTIST_ART_SUCCESS:
      return { ...state, artistListDetails: action.payload.data };
    default:
      return state;
  }
};

export default homeReducer;
