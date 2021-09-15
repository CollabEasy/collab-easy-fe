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
    const result = await api.call('https://4a5a-106-215-145-148.ngrok.io/api/login', config);
    // const result = await api.call('https://reqres.in/api/users', dummy);
    console.log("result: ", result);
    return result;
  } catch (error) {
    throw error;
  }
}
