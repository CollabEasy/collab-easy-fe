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

export const sendEmailToSlug = async (
  slug: string,
  subject: string,
  content: string
) => {
  const config = postConfig({"slug": slug, "subject" : subject, "content": content});
  try {
    const result = await api.call(`api/v1/notify/user/any`, config);
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

export const sendEmailToEnumGroup = async (
  enumGroup: string,
  subject: string,
  content: string,
) => {
  const config = postConfig({"subject" : subject, "content": content});
  try {
    const result = await api.call(`api/v1/notify/group/${enumGroup}`, config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchAllEmailEnumDetailsAPI = async () => {
  const config = getConfig();
  try {
    const result = await api.call(`api/v1/email/enums/all`, config);
    return result;
  } catch (error) {
    throw error;
  }
}
