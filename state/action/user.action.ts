import { User } from "types/model/user.model";

export const FETCH_USER_DATA = 'USER/FETCH_USER_DATA'
export const SET_USER_DATA = 'USER/SET_USER_DATA'
export const SET_USER_LOGGED_IN = 'USER/SET_USER_LOGGED_IN'

export const fetchUserData = (id: string) => ({
  type: FETCH_USER_DATA,
  payload: {
    id,
  },
});

export const setUserData = (data: User) => ({
  type: SET_USER_DATA,
  payload: {
    data
  }
})

export const setUserLoggedIn = (id: string) => ({
  type: SET_USER_LOGGED_IN,
  payload: {
    id,
  },
});
