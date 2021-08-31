import { Config } from "config/config";
import { CollabRequest } from "types/model/collab";
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

const getOptions = (params) => {
  return {
    method: "post",
    params: {
      params,
    },
  };
};

export const sendCollabRequest = async (collabRequest: CollabRequest) => {
  // uncomment below line to send collab request
  try {
    return await api.call<CollabRequest>(
      `${Config.baseUrl}/api/v1/collab/request`,
      getOptions(collabRequest)
    );
  } catch (error) {
    throw error;
  }
};

// http://localhost:3000/api/v1/collab/reject/requestId/22
export const rejectCollabRequest = async (id: string) => {
  try {
    return await api.call(
      `${Config.baseUrl}/v1/collab/reject/requestId/${id}`
    );
  } catch (error) {
    throw error;
  }
}

// http://localhost:3000/api/v1/collab/accept/requestId/23
export const accpetCollabeRequest = async (id: string) => {
  try {
    return await api.call(
      `${Config.baseUrl}/v1/collab/accept/requestId/${id}`
    );
  } catch (error) {
    throw error;
  }
}
