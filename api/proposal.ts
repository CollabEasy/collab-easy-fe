import api from "./client";
import { ProposalData } from "types/model";

const postConfigWithToken = (dataToSend) => {
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

const postConfig = (dataToSend) => {
  return {
    method: "post",
    data: dataToSend,
    headers: {
      "content-type": "application/json",
    },
  };
};

export const getAllProposalsApi = async () => {
  let dataToSend = {"categories": []}
  const config = postConfig(dataToSend);
  try {
      const proposals = await api.call("api/v1/proposal/get", config);
      return proposals;
  } catch (error) {
    throw error;
  }
};

export const addProposalApi = async (data: ProposalData) => {
  const config = postConfigWithToken(data);
  try {
    const proposal = await api.call("api/v1/proposal/create", config);
    return proposal;
  } catch (error) {
    throw error;
  }
};

export const updateProposalApi = async (proposalId: string, data: ProposalData) => {
  const config = postConfigWithToken(data);
  try {
    let url = "api/v1/proposal/" + proposalId + "/update";
    const proposal = await api.call(url, config);
    return proposal;
  } catch (error) {
    throw error;
  }
};

export const getProposalByIdAPI = async (id: string) => {
  const config = getConfigWithToken();
  try {
    const result = await api.call(
      `api/v1/proposal/${id}`,
      config
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// export const getProposalByArtistSlugAPI = async (slug: string) => {
//   const config = getConfig();
//   try {
//     // const result = await api.call(
//     //   `api/v1/artist/category/slug/${slug}/artists`,
//     //   config
//     // );
//     // return result;
//   } catch (error) {
//     throw error;
//   }
// };
