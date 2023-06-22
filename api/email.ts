import api from "./client";
import { User } from "types/model";

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

export const sendEmail = async (
  subject: string,
  content: string
) => {
  const config = postConfig({"subject" : subject, "content": content});
  try {
    const result = await api.call(`api/v1/notify/user`, config);
    return result;
  } catch (error) {
    throw error;
  }
};


export const sendEmailToAll = async (
  subject: string,
  content: string
) => {
  const config = postConfig({"subject" : subject, "content": content});
  try {
    const result = await api.call(`api/v1/notify/all`, config);
    return result;
  } catch (error) {
    throw error;
  }
};
