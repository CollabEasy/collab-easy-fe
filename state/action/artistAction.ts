// import { User, Login } from "types/model/user";

export const FETCH_ARTIST_CATEGORIES_DATA = 'ARTIST/FETCH_ARTIST_DATA'
export const SET_ARTIST_CATEGORIES_DATA = 'ARTIST/SET_ARTIST_CATEGORIES_DATA'

export const fetchArtistCategoriesData = () => ({
  type: FETCH_ARTIST_CATEGORIES_DATA,
  payload: {},
});

export const setArtistCategoriesData = (data: any) => ({
  type: SET_ARTIST_CATEGORIES_DATA,
  payload: {
    data
  }
})
