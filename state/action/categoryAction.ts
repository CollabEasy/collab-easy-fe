import { User } from 'types/model';
import * as actionType from '../actionTypes/categoryActionTypes';

export const setSelectedId = (id: number) => ({
    type: actionType.SET_SELETECTED_ID,
    payload: {
      id,
    },
})

export const fetchArtistsByCategory = (id: number) => ({
  type: actionType.FETCH_ARTIST_BY_CATEGORY,
  payload: {
    id,
  }
})

export const fetchArtistsByCategoryRequest = () => ({
  type: actionType.FETCH_ARTIST_BY_CATEGORY_REQUEST,
  payload: {}
})

export const fetchArtistsByCategorySuccess = (data: any) => ({
  type: actionType.FETCH_ARTIST_BY_CATEGORY_SUCCESS,
  payload: {
    data
  }
})

export const getAllCategories = () => ({
  type: actionType.FETCH_ALL_CATEGORIES,
  payload: {},
});


export const getAllCategoriesRequest = () => ({
  type: actionType.FETCH_ALL_CATEGORIES_REQUEST,
  payload: {},
});

export const getAllCategoriesSuccess = (data: any) => ({
  type: actionType.FETCH_ALL_CATEGORIES_SUCCESS,
  payload: {
    data
  },
});


