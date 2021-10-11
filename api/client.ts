import axios from 'axios';
import { Config } from 'config/config';

export default class api {
  static async call<T>(path: string, options?: object): Promise<T> {
    const url = `${Config.backendEndpoint}/${path}`
    return axios({ url, ...options }).then((res) => res.data);
  }
}