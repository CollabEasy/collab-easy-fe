import { Config } from "config/config";
// import { User } from "types/model/user";
import api from "./client";

const postConfig = (dataToSend) => {
    return {
        method: 'post',
        data: JSON.stringify(dataToSend),
        headers: {'content-type': 'application/json'}
    }
}

export const getLoginData = async (token: string) => {
  const config = postConfig({"idToken": token});
    console.log({token});
    // const dummy = postConfig({
    //     "name": "morpheus",
    //     "job": "leader"
    // });
  try {
    /* replace url with actual url */
    const result = await api.call('api/v1/artist/login', config);
    console.log("result: ", result);
    return result;
  } catch (error) {
    throw error;
  }
}
