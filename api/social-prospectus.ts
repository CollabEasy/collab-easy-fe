import api from "./client";
import { UserSocialProspectus } from "types/model";

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

export const fetchArtistSocialProspectusAPI = async () => {
  const config = getConfig();
  console.log("Rabbal is inside fetching social prospectus API ");
  try {
    const result = await api.call(
      `api/v1/artist/social-prospectus/all`,
      config
    );
    return result;
  } catch (error) {
    throw error;
  }
};


export const addArtistSocialProspectusAPI = async (data: any) => {
    const config = postConfig(data);
    console.log("Rabbal is inside saving social prospectus API ", data);
	try {
		const result = await api.call('api/v1/artist/social-prospectus/add', config);
		return result;
	} catch (error) {
		throw error;
	}
}


export const deleteArtistSocialProspectusAPI = async (data: any) => {
  const config = postConfig(data);
  console.log("Rabbal is inside delete social prospectus API ", data);
  try {
    const result = await api.call('api/v1/artist/social-prospectus/delete', config);
    return result;
  } catch (error) {
    throw error;
  }
}