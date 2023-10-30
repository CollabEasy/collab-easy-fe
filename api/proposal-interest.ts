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

export const getProposalsInterestsApi = async (proposalId: string) => {
  const config = getConfig();
  try {
    let url = "api/v1/proposal/" + proposalId + "/interests/get";
    const proposals = await api.call(url, config);
    return proposals;
  } catch (error) {
    throw error;
  }
};

export const addProposalInterestApi = async (proposalId: string, data: ProposalData) => {
  const config = postConfigWithToken(data);
  try {
    console.log("inside pai");
    let url = "api/v1/proposal/" + proposalId + "/show_interest"
    const proposal = await api.call(url, config);
    return proposal;
  } catch (error) {
    throw error;
  }
};

// export const getProposalByIdApi = async (proposalId: string) => {
//   const config = getConfig();
//   try {
//     const result = await api.call(
//       `api/v1/proposal/${proposalId}`,
//       config
//     );
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };
