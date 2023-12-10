import * as userActionTypes from '../actionTypes/userActionTypes';
import * as actionTypes from '../actionTypes/homeActionTypes';
import { HomeState } from "types/states";

const initialState: HomeState = {
  homeDetails: {},
  loginModalDetails: {
    openModal: false,
  },
  isLoading: true,
  routeToMyWondor: false,
  artistListDetails: {},
  currentPathname: "",
};

const homeReducer = (state = initialState, action): HomeState => {
  console.log("action : ", action);
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
    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload.isLoading}
    case actionTypes.ROUTE_TO_MY_WONDOR:
      const { route } = action.payload;
      console.log("route : ", route);
      return {
        ...state,
        routeToMyWondor: route,
      }
    case actionTypes.SET_CURRENT_PATHNAME:
      const {pathname} = action.payload;
      return {
        ...state,
        currentPathname: pathname,
      }
    default:
      return state;
  }
};

export default homeReducer;
