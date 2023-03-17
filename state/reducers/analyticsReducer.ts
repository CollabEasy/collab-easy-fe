import * as actionType from "../actionTypes/analyticsActionTypes";
import { AnalyticsState } from "types/states/analyticsState";

const initialState: AnalyticsState = {
  users: {
    isFetchingUserAnalytics: true,
    totalUsers: 0,
    datewiseUsers: [],
  },
  collabs: {
    isFetchingCollabAnalytics: true,
    totalCollabs: 0,
    datewiseCollabs: [],
  }
};

const scratchpadReducer = (state = initialState, action): AnalyticsState => {
  switch (action.type) {
    case actionType.FETCH_USER_ANALYTICS_REQUEST:
      return {
        ...state,
        users: { 
            isFetchingUserAnalytics: true,
            totalUsers: 0,
            datewiseUsers: [],
        }
      };
    case actionType.FETCH_USER_ANALYTICS_SUCCESS:
      const data = action.payload.data.data;
      return {
        ...state,
        users: { 
            isFetchingUserAnalytics: false,
            totalUsers: data.totalUsers,
            datewiseUsers: data.dateWiseUsersList,
        }
      };
    case actionType.FETCH_USER_ANALYTICS_FAILURE:
      return {
        ...state,
        users: { 
            isFetchingUserAnalytics: true,
            totalUsers: 0,
            datewiseUsers: [],
        }
      };
    default:
      return state;
  }
};

export default scratchpadReducer;
