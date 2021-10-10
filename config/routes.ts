import { AppRouteCreators } from 'types/core';
import { WebRoute } from 'types/model/webroute';
import { Config } from './config';

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toDiscover: () => ({ href: "/" }),
  toArtist: () => ({ href: "/discover-artist/" }),
  toProfile: ({ id }) => ({
    href: '/profile/[id]',
    as: `/profile/${id}`,
  }),
  toArtistProfile: (artistType, id) => ({
    href: '/artist/[id]',
    as: `/artist/${id}?type=${artistType}`,
  }),
  toEditProfile: (id, tab = '') => (
    tab ? {
      href: '/artist/edit/[id]',
      as: `/artist/edit/${id}?tab=${tab}`,
    } : {
      href: '/artist/edit/[id]',
      as: `/artist/edit/${id}`,
    }),
};


export const toWebRoute = (route: WebRoute): WebRoute =>
  !('as' in route) ? route : { href: route.as }

export const routeToHref = (route: WebRoute) => {
  const { href: routeHref } = toWebRoute(route)
  return `${Config.baseUrl}${routeHref}`
}