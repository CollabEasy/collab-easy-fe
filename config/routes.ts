import { AppRouteCreators } from 'types/core';
import { WebRoute } from 'types/model/webroute';
import { Config } from './config';

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toDiscover: () => ({ href: "/" }),
  toArtist: () => ({ href: "/discover-artist/" }),
  toProfile: () => ({
    href: '/profile',
    as: `/profile/`,
  }),
  toArtistProfile: () => ({
    href: '/artist/profile',
    as: `/artist/profile`,
  }),
  toEditProfile: () => ({
    href: '/artist/edit/',
    as: `/artist/edit/`,
  }),
};


export const toWebRoute = (route: WebRoute): WebRoute =>
  !('as' in route) ? route : { href: route.as }

export const routeToHref = (route: WebRoute) => {
  const { href: routeHref } = toWebRoute(route)
  return `${Config.baseUrl}${routeHref}`
}