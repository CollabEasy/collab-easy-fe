import { CollabRequestData, SearchCollab, SendCollabRequest } from "types/model";
import api from "./client";

const postConfig = (dataToSend?: object) => {
  return {
    method: "post",
    data: JSON.stringify(dataToSend),
    headers: { 
      "content-type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}` },
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

export const sendCollabRequest = async (collabRequest: SendCollabRequest) => {
  try {
    return await api.call<SendCollabRequest>(
      "api/v1/collab/request",
      postConfig(collabRequest)
    );
  } catch (error) {
    throw error;
  }
};

export const updateCollabRequest = async (collabRequest: CollabRequestData) => {
  try {
    return await api.call("api/v1/collab/request/update", postConfig(collabRequest));
  } catch (error) {
    throw error;
  }
};

export const rejectCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/reject/request/${id}`, postConfig());
  } catch (error) {
    throw error;
  }
};

export const acceptCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/accept/request/${id}`, postConfig());
  } catch (error) {
    throw error;
  }
};

export const cancelCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/cancel/request/${id}`, postConfig());
  } catch (error) {
    throw error;
  }
};

export const completeCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/complete/request/${id}`, postConfig());
  } catch (error) {
    throw error;
  }
};

export const getCollabRequest = async (searchCollabData: SearchCollab) => {
  try {
    return await api.call(`api/v1/collab/search`, postConfig(searchCollabData));
  } catch (error) {
    throw error;
  }
};


export const fetchCollabsWithUser = async (data: any) => {
  try {
    const config = postConfig(data);
    return await api.call(`api/v1/collab/create/eligible`, config);
  } catch (error) {
    throw error;
  }
};

export const fetchCollabsDateWise = async (fetchAll: boolean) => {
  try {
    const config = getConfigWithToken();
    return await api.call(`api/v1/collab/getByDate?all=${fetchAll}`, config);
  } catch (error) {
    throw error;
  }
}