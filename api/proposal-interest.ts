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
  const config = getConfigWithToken();
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
    let url = "api/v1/proposal/" + proposalId + "/show_interest"
    const proposal = await api.call(url, config);
    return proposal;
  } catch (error) {
    throw error;
  }
};

export const acceptProposalInterestApi = async (proposalId: string, data: any) => {
  const config = postConfigWithToken(data);
  try {
    let url = "api/v1/proposal/" + proposalId + "/accept"
    const proposal = await api.call(url, config);
    return proposal;
  } catch (error) {
    throw error;
  }
};

export const rejectProposalInterestApi = async (proposalId: string, data: any) => {
  const config = postConfigWithToken(data);
  try {
    let url = "api/v1/proposal/" + proposalId + "/reject"
    const proposal = await api.call(url, config);
    return proposal;
  } catch (error) {
    throw error;
  }
};
