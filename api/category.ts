import api from "./client";

const postConfig = (dataToSend) => {
  return {
    method: "post",
    data: dataToSend,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  };
};

const getConfig = () => {
  return {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const getArtistsByCategoryIdAPI = async (id: number) => {
  const config = getConfig();
  try {
    const result = await api.call(
      `api/v1/artist/category/id/${id}/artists`,
      config
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getArtistsByCategorySlugAPI = async (slug: string) => {
  const config = getConfig();
  try {
    const result = await api.call(
      `api/v1/artist/category/slug/${slug}/artists`,
      config
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  const config = getConfig();
  try {
    const categories = await api.call("api/v1/artist/categories", config);
    return categories;
  } catch (error) {
    throw error;
  }
};
