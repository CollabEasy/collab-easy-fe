import api from "./client";
import { ProposalData } from "types/model";

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

const getConfigWithToken = () => {
  return {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const getConfig = () => {
  return {
    method: "get",
  };
};

export const getAllProposals = async () => {
    const config = getConfig();
    try {
    //   const categories = await api.call("api/v1/category/all", config);
    //   return categories;
    } catch (error) {
      throw error;
    }
  };
  
  export const addProposalApi = async (data: ProposalData) => {
    const config = postConfig(data);
    try {
    //   const categories = await api.call("api/v1/category/add", config);
    //   return categories;
    } catch (error) {
      throw error;
    }
  };

export const getProposalByIdAPI = async (id: string) => {
  const config = getConfigWithToken();
  try {
    // const result = await api.call(
    //   `api/v1/artist/category/id/${id}/artists`,
    //   config
    // );
    // return result;
  } catch (error) {
    throw error;
  }
};

export const getProposalByArtistSlugAPI = async (slug: string) => {
  const config = getConfig();
  try {
    // const result = await api.call(
    //   `api/v1/artist/category/slug/${slug}/artists`,
    //   config
    // );
    // return result;
  } catch (error) {
    throw error;
  }
};
