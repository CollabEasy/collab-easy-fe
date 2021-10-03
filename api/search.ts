import api from "./client";

const getConfig = (query) => {
  return {
    method: 'get',
    params: {
      query,
    }
  }
}

export const getSearchResult = async (query: string) => {
  const config = getConfig(query);
  try {
    const result = await api.call('api/v1/search', config);
    return result;
  } catch (error) {
    throw error;
  }
}