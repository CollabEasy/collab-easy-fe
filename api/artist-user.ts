import { Config } from "config/config";
// import { User } from "types/model/user";
import api from "./client";

const getConfig = () => {
    return {
        method: 'get',
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
    const categories = await api.call('https://4a14-106-215-145-86.ngrok.io/api/v1/artist/categories', config);
    // const result = await api.call('https://reqres.in/api/users', dummy);
    console.log("categories: ", categories);
    return categories;
  } catch (error) {
    throw error;
  }
}
