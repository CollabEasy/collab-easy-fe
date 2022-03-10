import api from "./client";
import { User } from "types/model";

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

export const fetchScratchpadByArtistIdAPI = async () => {
  const config = getConfig();
  try {
    const result = await api.call(
      `api/v1/artist/scratchpad/`,
      config
    );
    return result;
  } catch (error) {
    throw error;
  }
};


export const updateArtistScratchpad = async (data: any) => {
	const config = postConfig(data);
  console.log("Rabbal is inside saving scratchpad API ", data);
	try {
		const result = await api.call('api/v1/artist/scratchpad', config);
		return result;
	} catch (error) {
		throw error;
	}
}
