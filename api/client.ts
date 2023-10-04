import axios from 'axios';
import { Config } from 'config/config';

export default class api {
  static async call<T>(path: string, options?: object): Promise<T> {
    const url = `${Config.backendEndpoint}/${path}`
    return axios({ url, ...options }).then((res) => res.data);
  }

  static async callIpWho(IP : string, options?: object) {
    const url = `${Config.IpWhoEndpoint}/${IP}`
    return axios({ url, ...options }).then((res) => res.data);
  }

  static fetcher = async (IP : string, options?: object) => {
    try {
      const url = `${Config.IpWhoEndpoint}/${IP}`
      const response = await fetch(url)
  
      if (!response.ok) {
        throw new Error(`Failed to retrieve data ${url}}`)
      }
  
      const data = await response.json()
  
      return data
    } catch (error) {
      console.error(error)
    }
  }
}