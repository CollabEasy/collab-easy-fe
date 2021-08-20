import { HOME, OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "state/action";
import { HomeState } from "types/core";

const initialState: HomeState = {
  homeDetails: {},
  loginModalDetails: {
    openModal: false,
  },
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
      console.log("OPEN_LOGIN_MODAL reducer");
      return { ...state, loginModalDetails: { openModal: true } };
    case CLOSE_LOGIN_MODAL:
      return { ...state, loginModalDetails: { openModal: false } };
    default:
      return state;
  }
};

export default homeReducer;
