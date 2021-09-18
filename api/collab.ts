import { SearchCollab, SendCollabRequest } from "types/model";
import api from "./client";

// http://localhost:3000/api/v1/collab/request

// {
//   "receiverId" : "154384",
//   "requestData" : {
//       "message" : "i want to connect",
//       "collabTheme" : "painting"
//   },
//   "collabDate" : "2021-08-22T17:40:52.764762"
// }

const getConfig = (params?: object) => {
  return {
    method: "get",
    params: {
      params,
    },
  };
};

const postConfig = (dataToSend) => {
  return {
    method: "post",
    data: JSON.stringify(dataToSend),
    headers: { "content-type": "application/json" },
  };
};

export const sendCollabRequest = async (collabRequest: SendCollabRequest) => {
  // uncomment below line to send collab request
  try {
    return await api.call<SendCollabRequest>(
      "api/v1/collab/request",
      postConfig(collabRequest)
    );
  } catch (error) {
    throw error;
  }
};

// http://localhost:3000/api/v1/collab/reject/requestId/22
export const rejectCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/reject/requestId/${id}`, getConfig());
  } catch (error) {
    throw error;
  }
};

// http://localhost:3000/api/v1/collab/accept/requestId/23
export const acceptCollabRequest = async (id: string) => {
  try {
    return await api.call(`api/v1/collab/accept/requestId/${id}`, getConfig());
  } catch (error) {
    throw error;
  }
};

export const getCollabRequest = async (searchCollab: SearchCollab) => {
  try {
    return await api.call(`api/v1/collab/search`, postConfig(searchCollab));
  } catch (error) {
    throw error;
  }
};
