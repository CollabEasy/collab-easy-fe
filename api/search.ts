import api from "./client";

const getConfig = (query) => {
    return {
        method: 'get',
        params: {
            // query,
            postId: 1,
        }
    }
}

export const getSearchResult = async (query: string) => {
  const config = getConfig(query);
  try {
    // http://localhost:8080/api/v1/search
    const result = await api.call('https://jsonplaceholder.typicode.com/comments', config);
    /* replace url with actual url */
    // const result = await api.call('api/v1/search', config);
    
    return result;
  } catch (error) {
    throw error;
  }
}