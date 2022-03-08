import { User } from 'types/model';
import * as actionType from '../actionTypes/categoryActionTypes';

export const setSelectedCategoryId = (id: number) => ({
    type: actionType.SET_SELETECTED_CATEGORY_ID,
    payload: {
      id,
    },
})

export const setSelectedCategorySlug = (slug: string) => ({
  type: actionType.SET_SELETECTED_CATEGORY_SLUG,
  payload: {
    slug,
  },
})

export const fetchArtistsByCategoryId = (id: number) => ({
  type: actionType.FETCH_ARTIST_BY_CATEGORY_ID,
  payload: {
    id,
  }
})

export const fetchArtistsByCategoryIdRequest = () => ({
  type: actionType.FETCH_ARTIST_BY_CATEGORY_ID_REQUEST,
  payload: {}
})

export const fetchArtistsByCategoryIdSuccess = (data: any) => ({
  type: actionType.FETCH_ARTIST_BY_CATEGORY_ID_SUCCESS,
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


