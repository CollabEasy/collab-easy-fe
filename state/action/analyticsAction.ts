import * as actionType from '../actionTypes/analyticsActionTypes';

export const fetchUserAnalytics = (start_date: string, end_date: string) => ({
  type: actionType.FETCH_USER_ANALYTICS,
  payload: {
      start_date,
      end_date,
  }
});

export const fetchUserAnalyticsRequest = () => ({
  type: actionType.FETCH_USER_ANALYTICS_REQUEST,
  payload: {}
});

export const fetchUserAnalyticsSuccess = (data: any) => ({
  type: actionType.FETCH_USER_ANALYTICS_SUCCESS,
  payload: {
    data
  }
});