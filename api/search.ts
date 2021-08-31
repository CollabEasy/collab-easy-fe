import { Config } from "config/config";
// import { User } from "types/model/user";
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
    /* replace url with actual url */
    const result = await api.call('http://localhost:8080/api/v1/search', config);
    return result;
  } catch (error) {
    throw error;
  }
}
