import api from "./client";

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

export const fetchNotifications = async () => {
  const config = getConfig();
  try {
    const result = await api.call(`api/v1/notification/`, config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const markNotificationsRead = async () => {
  const config = postConfig(null);
  try {
    const result = await api.call(`api/v1/notification/read`, config);
    return result;
  } catch (error) {
    throw error;
  }
};
