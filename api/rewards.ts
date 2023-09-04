import api from "./client";

const getConfig = () => {
  return {
    method: 'get',
  }
}

const getConfigWithToken = () => {
  return {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

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

export const fetchRewardsActivity = async () => {
  const config = getConfig();
  try {
    const result = await api.call(
      `api/v1/contest/all/`,
      config
    );
    return result;
  } catch (error) {
    throw error;
  }
};