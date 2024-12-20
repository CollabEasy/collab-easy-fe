import { User } from "types/model";
import api from "./client";

const getConfig = () => {
  return {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    },
  };
};

const postConfig = (dataToSend) => {
  return {
    method: "post",
    data: JSON.stringify(dataToSend),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    },
  };
};

const postFileConfig = (dataToSend: FormData) => {
  return {
    method: "post",
    data: dataToSend,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  };
};

export const updateArtistCategories = async (data: any) => {
  const config = postConfig(data);
  try {
    const categories = await api.call("api/v1/artist/arts", config);
    return categories;
  } catch (error) {
    throw error;
  }
};

export const updateArtistPreference = async (key: string, value: any) => {
  const config = postConfig(value);
  try {
    const result = await api.call("api/v1/artist/preference/" + key, config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchArtistPreferencesAPI = async () => {
  const config = getConfig();
  try {
    const result = await api.call("api/v1/artist/preferences", config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateArtistProfile = async (data: User) => {
  const config = postConfig(data);
  try {
    const result = await api.call("api/v1/artist/update", config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchArtistSkillsAPI = async (handle: string) => {
  const config = getConfig();
  try {
    let url = "api/v1/artist/arts";
    if (handle.length > 0) {
      // here data is handle.
      url += "?handle=" + handle;
    }
    const result = await api.call(url, config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchUserByHandle = async (handle: string) => {
  const config = getConfig();
  try {
    const result = await api.call("api/v1/artist/details?handle=" + handle);
    return result;
  } catch (error) {
    return error;
  }
};

export const updateProfilePicture = async (data: FormData) => {
  const config = postFileConfig(data);
  try {
    const result = await api.call("api/v1/artist/avatar/update", config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getArtistData = async (): Promise<User> => {
  const result = await api.call<any>("api/v1/artist/details", getConfig());
  return result.data as User;
};

export const fetchProfileCompleteStatus = async () => {
  const config = getConfig();
  const result = await api.call<any>("api/v1/artist/profile/complete", config);
  return result;
};
