import api from "./client";

const postConfig = (dataToSend) => {
  return {
    method: 'post',
    data: JSON.stringify(dataToSend),
    headers: {'content-type': 'application/json'}
  }
}

export const getLoginData = async (token: string) => {
  const config = postConfig({"idToken": token});
  try {
    const result = await api.call<any>('api/v1/artist/login', config);
    console.log("result: ", result);
    return result;
  } catch (error) {
    throw error;
  }
}
