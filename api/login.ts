import api from "./client";

const postConfig = (dataToSend) => {
  return {
    method: 'post',
    data: JSON.stringify(dataToSend),
    headers: {'content-type': 'application/json'}
  }
}

export const getLoginData = async (token: string) => {
  const config = postConfig({"id_token": token});
  try {
    const result = await api.call('api/v1/artist/login', config);
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

export const getBasicUser = async (slug: string) => {
  const config = {
    method: 'get',
  }
  try {
    const result = await api.call(`api/v1/artist/basic/${slug}`, config);
    return result;
  } catch (error) {
    throw error;
  }
}
