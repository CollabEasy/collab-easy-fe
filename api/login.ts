import api from "./client";

const postConfig = (dataToSend) => {
  return {
    method: 'post',
    data: JSON.stringify(dataToSend),
    headers: {'content-type': 'application/json'}
  }
}

export const getLoginData = async (token: string) => {
  console.log("You have the token ", token);
  const config = postConfig({"id_token": token});
  console.log("you have ", config);
  try {
    const result = await api.call('api/v1/artist/login', config);
    console.log("result ", result);
    return result;
  } catch (error) {
    throw error;
  }
}

export const getArtistDetails = async (token: string) => {
  const config = {
    method: 'get',
    headers: {'Authorization': 'Bearer ' + token}
  }
  try {
    const result = await api.call('api/v1/artist/details', config);
    return result;
  } catch (error) {
    throw error;
  }
}
