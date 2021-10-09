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
    
    /* return [
      {
        entity_type: 'ART',
        name: 'Music',
        slug: 'music',
        id: 1
      },
      {
        entity_type: 'ART',
        name: 'Music Production',
        slug: 'music production',
        id: 2
      },
      {
        entity_type: 'ARTIST',
        name: 'Mutt Schimit',
        slug: 'mutt schimit',
        id: 3
      },
    ] */
  } catch (error) {
    throw error;
  }
}