import { User } from "types/model/user";

export const FETCH_USER_DATA = 'USER/FETCH_USER_DATA'
export const SET_USER_DATA = 'USER/SET_USER_DATA'
export const SET_USER_LOGGED_IN = 'USER/SET_USER_LOGGED_IN'
export const RESET_USER_LOGGED_IN = 'RESET_USER_LOGGED_IN'

export const fetchUserDataAction = (id: string) => ({
  type: FETCH_USER_DATA,
  payload: {
    id,
  },
});

export const setUserDataAction = (data: User) => ({
  type: SET_USER_DATA,
  payload: {
    data
  }
})

export const setUserLoggedIn = (data: any) => ({
  type: SET_USER_LOGGED_IN,
  payload: {
    data,
  },
});

export const resetUserLoggedIn = () => ({
  type: RESET_USER_LOGGED_IN
});
