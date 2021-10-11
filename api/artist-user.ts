import { User } from "types/model";
import api from "./client";

const getConfig = () => {
  return {
    method: 'get',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }   
}

const postConfig = (dataToSend) => {
  return {
    method: 'post',
    data: JSON.stringify(dataToSend),
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
    }
  }
}

export const getArtistCategoryData = async () => {
  const config = getConfig();
  try {
    const categories = await api.call('api/v1/artist/categories', config);
    console.log("categories: ", categories);
    return categories;
  } catch (error) {
    throw error;
  }
}

export const updateArtistCategories = async (data: any) => {
	console.log("updateArtistCategories-----: ", data);
	const config = postConfig(data);
	try {
		const categories = await api.call('api/v1/artist/arts', config);
		const artistList = {"data":[{"id":5,"artistId":"433250de-6ec4-4c6e-82be-3619e412e7c5","artId":2},{"id":6,"artistId":"433250de-6ec4-4c6e-82be-3619e412e7c5","artId":3}],"status":"success"};
		console.log("artistList: ", artistList);
		return artistList;
	} catch (error) {
		throw error;
	}
}


export const updateArtistProfile = async (data: User) => {
	console.log("updateArtistProfile-----: ", data);
	const config = postConfig(data);
	try {
		const result = await api.call('api/v1/artist/update', config);
		console.log("artistList: ", result);
		return result;
	} catch (error) {
		throw error;
	}
}


export const getArtistData = async (): Promise<User> => {
  const result = await api.call<any>('api/v1/artist/details', getConfig());
  return result.data as User;
}
