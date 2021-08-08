import { AppRouteCreators, WebRoute } from "../types/core";
import { Config } from "./config";

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toLogin: () => ({ href: "/login" }),
  toSignup: () => ({ href: "/signup" }),
  toDiscover: () => ({ href: "/" }),
  toArtist: () => ({ href: "/discover-artist/" }),
  toProfile: ({ id }) => ({
    href: '/profile/[id]',
    as: `/profile/${id}`,
  }),
};


export const toWebRoute = (route: WebRoute): WebRoute =>
  !('as' in route) ? route : { href: route.as }

export const routeToHref = (route: WebRoute) => {
  const { href: routeHref } = toWebRoute(route)
  return `${Config.baseUrl}${routeHref}`
}