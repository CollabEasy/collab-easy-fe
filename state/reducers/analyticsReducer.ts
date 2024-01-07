import * as actionType from "../actionTypes/analyticsActionTypes";
import * as emailActionTypes from "../actionTypes/emailActionTypes";
import { AnalyticsState } from "types/states/analyticsState";

const initialState: AnalyticsState = {
  users: {
    isFetchingUserAnalytics: true,
    totalUsers: 0,
    datewiseUsers: [],
    countryWiseData: [],
  },
  collabs: {
    isFetchingCollabAnalytics: true,
    totalCollabs: 0,
    datewiseCollabs: [],
  },
  emails: {
    emailEnumDetails: [],
  }
};

const analyticsReducer = (state = initialState, action): AnalyticsState => {
  switch (action.type) {
    case actionType.FETCH_USER_ANALYTICS_REQUEST:
      return {
        ...state,
        users: { 
            isFetchingUserAnalytics: true,
            totalUsers: 0,
            datewiseUsers: [],
            countryWiseData: [],
        }
      };
    case actionType.FETCH_USER_ANALYTICS_SUCCESS:
      const data = action.payload.data.data;
      console.log("data : ", data);
      return {
        ...state,
        users: { 
            isFetchingUserAnalytics: false,
            totalUsers: data.totalUsers,
            datewiseUsers: data.dateWiseUsersList,
            countryWiseData: data.countryWiseData,
        }
      };
    case actionType.FETCH_USER_ANALYTICS_FAILURE:
      return {
        ...state,
        users: { 
            isFetchingUserAnalytics: true,
            totalUsers: 0,
            datewiseUsers: [],
            countryWiseData: [],
        }
      };
    case emailActionTypes.FETCH_ALL_EMAIL_ENUMS_SUCCESS:
      const emailData = action.payload.data
      return {
        ...state,
        emails: {
          emailEnumDetails: emailData,
        }
      }
    default:
      return state;
  }
};

export default analyticsReducer;
