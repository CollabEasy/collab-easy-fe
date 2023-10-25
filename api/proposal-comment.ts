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

export const fetchProposalCommentAPI = async (proposalId: string) => {
  const config = getConfig();
  try {

    // let url = 'api/v1/collab/conversation/';
	//   url +=  collabId;
    // const result = await api.call(url, config);
    // return result;
  } catch (error) {
    throw error;
  }
};


export const addProposalCommentAPI = async (data: any) => {
  const config = postConfig(data["obj"]);
	try {
		// const result = await api.call('api/v1/collab/conversation/add', config);
		// return result;
	} catch (error) {
		throw error;
	}
}