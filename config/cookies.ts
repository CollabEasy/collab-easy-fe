import Cookie from 'js-cookie'

export enum Cookies {
  // `id_token` is the authentication id token of the user
  IdToken = 'id_token',
}

type CookieConfig = {
  domain?: string
  expires?: number | Date
}

export const setCookie = (cookie: Cookies, value, config?: CookieConfig) => {
  // todo: figure out what to do if we try to set the invalid cookie
  return Cookie.set(cookie, value, config)
}

// get a cookie using one of the Cookies enum values
export const getCookie = (cookie: Cookies) => Cookie.get(cookie)

// remove a cookie using one of the Cookies enum values
export const removeCookie = (cookie: Cookies) => Cookie.remove(cookie)
