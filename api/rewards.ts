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

const postConfig = (dataToSend?: object) => {
  return {
    method: "post",
    data: JSON.stringify(dataToSend),
    headers: { 
      "content-type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}` },
  };
};


export const verifyRefferalCode = async (referralCode: string) => {
  const config = postConfig();
  try {
    let url = `/api/v1/rewards/referral/verify/` + referralCode;
    const result = await api.call(url, config);
    return result;
  } catch (error) {
    throw error;
  }
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