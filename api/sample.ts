import { UserSample } from "types/model";
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

const getConfigWithoutToken = () => {
  return {
    method: "get",
  };
};

export const uploadSampleApi = async (data: FormData) => {
  const config = postConfig(data);
  try {
    const result = await api.call("api/v1/artist/sample/upload", config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchSampleApi = async (slug: string) => {
  const config = getConfigWithoutToken();

  try {
    const result = await api.call("api/v1/artist/" + slug + "/sample/list", config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteSampleAPI = async (data: UserSample) => {
  const config = postConfig(data);
  try {
    const result = await api.call("api/v1/artist/sample/delete", config);
    return result;
  } catch (error) {
    throw error;
  }
}
