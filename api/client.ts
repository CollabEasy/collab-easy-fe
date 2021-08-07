export default class api {
  static async get<T>(url: string): Promise<T> {
    return new Promise(resolve => {
      fetch(url)
        .then(response => response.json())
        .then(body => {
          resolve(body);
        });
    });
  }
}