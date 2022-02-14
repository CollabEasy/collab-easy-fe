import * as userActionTypes from '../actionTypes/userActionTypes';
import * as actionTypes from '../actionTypes/homeActionTypes';
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
    case actionTypes.HOME:
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
    case actionTypes.OPEN_LOGIN_MODAL:
      return { ...state, loginModalDetails: { openModal: true } };
    case actionTypes.CLOSE_LOGIN_MODAL:
      return { ...state, loginModalDetails: { openModal: false } };
    case userActionTypes.UPDATE_ARTIST_ART_SUCCESS:
      return { ...state, artistListDetails: action.payload.data };
    default:
      return state;
  }
};

export default homeReducer;
