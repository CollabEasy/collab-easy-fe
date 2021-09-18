import { Config } from "config/config";
// import { User } from "types/model/user";
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
    // const dummy = postConfig({
    //     "name": "morpheus",
    //     "job": "leader"
    // });
  try {
    /* replace url with actual url */
    // const categories = await api.call('https://4a14-106-215-145-86.ngrok.io/api/v1/artist/categories', config);
    // const result = await api.call('https://reqres.in/api/users', dummy);
    const categories = {"data":["DANCING","PAINTING","CRAFT","MUSIC","VIDEO EDITING"],"status":"success"};
    console.log("categories: ", categories);
    return categories;
  } catch (error) {
    throw error;
  }
}

export const updateArtistCategories = async (data: any) => {
	console.log("updateArtistCategories-----: ", data);
	const config = postConfig(data);
		// const dummy = postConfig({
		//     "name": "morpheus",
		//     "job": "leader"
		// });
	try {
		/* replace url with actual url */
		// const categories = await api.call('https://4a14-106-215-145-86.ngrok.io/api/v1/artist/categories', config);
		// const result = await api.call('https://reqres.in/api/users', dummy);
		const artistList = {"data":[{"id":5,"artistId":"433250de-6ec4-4c6e-82be-3619e412e7c5","artId":2},{"id":6,"artistId":"433250de-6ec4-4c6e-82be-3619e412e7c5","artId":3}],"status":"success"};
		console.log("artistList: ", artistList);
		return artistList;
	} catch (error) {
		throw error;
	}
}
