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

export const uploadSampleApi = async (data: FormData) => {
  const config = postConfig(data);
  try {
    console.log("api called");
    const result = await api.call("api/v1/artist/sample/upload", config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchSampleApi = async (slug: string) => {
  const config = getConfig();
  try {
    const result = await api.call("api/v1/artist/" + slug + "/sample/list", config);
    return result;
  } catch (error) {
    throw error;
  }
};
