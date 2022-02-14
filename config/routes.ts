import { AppRouteCreators } from 'types/core';
import { WebRoute } from 'types/model/webroute';
import { Config } from './config';

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toDiscover: () => ({ href: "/" }),
  toArtist: () => ({ href: "/discover-artist/" }),
  toAboutUs: () => ({ href: "/about-us"}),
  toFAQ: () => ({ href: "faq"}),
  toPrivacy: () => ({ href: "/privacy" }),
  toContactUs: () => ({ href: "/contact-us" }),
  toTerms: () => ({ href: "/terms-and-policy" }),
  toProfile: () => ({
    href: '/profile',
    as: `/profile/`,
  }),
  toArtistProfile: (id) => ({
    href: '/artist/profile/[id]',
    as: `/artist/profile/${id}`,
  }),
  toEditProfile: (action) => ({
    href: '/artist/settings/[action]',
    as: `/artist/settings/${action}`,
  }),
  // toSampleUpload: () => ({
  //   href: '/artist/settings/',
  //   as: `/artist/settings/samples`,
  // }),
  // toPreferences: () => ({
  //   href: '/artist/settings/',
  //   as: `/artist/settings/preferences`,
  // }),
};


export const toWebRoute = (route: WebRoute): WebRoute =>
  !('as' in route) ? route : { href: route.as }

export const routeToHref = (route: WebRoute) => {
  const { href: routeHref } = toWebRoute(route)
  return `${Config.baseUrl}${routeHref}`
}