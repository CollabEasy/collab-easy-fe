import { CollabRequest } from "types/model";
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

const getOptions = (method, params?) => {
  return {
    method: method,
    params: {
      params,
    },
  };
};

export const sendCollabRequest = async (collabRequest: CollabRequest) => {
  // uncomment below line to send collab request
  try {
    return await api.call<CollabRequest>(
      'api/v1/collab/request',
      getOptions('post', collabRequest)
    );
  } catch (error) {
    throw error;
  }
};

// http://localhost:3000/api/v1/collab/reject/requestId/22
export const rejectCollabRequest = async (id: string) => {
  try {
    return await api.call(
      `v1/collab/reject/requestId/${id}`,
      getOptions('get')
    );
  } catch (error) {
    throw error;
  }
}

// http://localhost:3000/api/v1/collab/accept/requestId/23
export const acceptCollabRequest = async (id: string) => {
  try {
    return await api.call(
      `v1/collab/accept/requestId/${id}`,
      getOptions('get')
    );
  } catch (error) {
    throw error;
  }
}
