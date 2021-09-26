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

export const rejectCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/reject/requestId/${id}`, postConfig());
  } catch (error) {
    throw error;
  }
};

export const acceptCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/accept/requestId/${id}`, postConfig());
  } catch (error) {
    throw error;
  }
};

export const getCollabRequest = async (searchCollab: SearchCollab) => {
  try {
    return await api.call<{data: CollabRequestData}>(`api/v1/collab/search`, postConfig(searchCollab));
  } catch (error) {
    throw error;
  }
};
