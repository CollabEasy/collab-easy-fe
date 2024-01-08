import api from "./client";
import { SearchResult } from "types/model/searchResult";

const getConfig = (query) => {
  return {
    method: 'get',
    params: {
      query,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
  }
}

export const getSearchResult = async (query: string) => {
  const config = getConfig(query);
  try {
    const result: SearchResult = await api.call('api/v1/search', config);
    return result.data;
  } catch (error) {
    throw error;
  }
}