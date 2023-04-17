import { ContestEntry } from "types/model/contest";
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

export const fetchAllContestsApi = async () => {
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

export const fetchContestApi = async (slug: string) => {
  const config = getConfig();
  try {
    let url = 'api/v1/contest/';
    if (slug.length > 0) {
      // here data is handle.
      url += slug;
    }
    const result = await api.call(url, config);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addContestApi = async (data: ContestEntry) => {
  const config = postConfig(data);
  try {
    const result = await api.call('api/v1/contest/add', config);
    return result;
  } catch (error) {
    throw error;
  }
}

export const updateContestApi = async (data: any) => {
  const config = postConfig(data);
  try {
    const result = await api.call('api/v1/contest/update', config);
    return result;
  } catch (error) {
    throw error;
  }
}


export const fetchArtistSubmissionApi = async (slug: string) => {
  const config = getConfigWithToken();
  try {
    let url = 'api/v1/contest/submission/';
    if (slug.length > 0) {
      // here data is handle.
      url += slug + "/entry";
    }
    const result = await api.call(url, config);
    return result;
  } catch (error) {
    throw error;
  }
};