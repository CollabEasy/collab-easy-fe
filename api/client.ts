import axios from 'axios';
export default class api {
  static async call<T>(url: string, options?: object): Promise<T> {
    /* return new Promise(resolve => {
      fetch(url)
        .then(response => response.json())
        .then(body => {
          resolve(body);
        });
    }); */
    return axios({ url, ...options }).then((res) => res.data);
  }
}