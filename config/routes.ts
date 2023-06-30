import { AppRouteCreators } from 'types/core';
import { WebRoute } from 'types/model/webroute';
import { Config } from './config';

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toDiscover: () => ({ href: "/" }),
  toArtist: () => ({ href: "/discover-artist/" }),
  toAboutUs: () => ({ href: "/about-us"}),
  toFAQ: () => ({ href: "/faq"}),
  toTutorial: () => ({ href: "/tutorial"}),
  toPrivacy: () => ({ href: "/privacy" }),
  toContactUs: () => ({ href: "/contact-us" }),
  toTerms: () => ({ href: "/terms-and-policy" }),
  toGetInspired: () => ({ href: "/get-inspired" }),
  toAllContestPage: () => ({ href: "/all-contest" }),
  toProfile: () => ({
    href: '/profile',
    as: `/profile/`,
  }),
  toArtistProfile: (id) => ({
    href: '/artist/profile/[id]',
    as: `/artist/profile/${id}`,
  }),
  toEditProfile: (tab) => ({
    href: '/artist/portal?tab=[tab]',
    as: `/artist/portal?tab=${tab}`,
  }),
  toCollabPage: (id) => ({
    href: '/collab/[id]',
    as: `/collab/${id}`,
  }),
  toContestPage: (slug, tab) => ({
    href: '/contest/[slug]?tab=[tab]',
    as: `/contest/${slug}?tab=${tab}`,
  }),
  toAnalyticsPage: () => ({
    href: '/admin/analytics',
    as: '/admin/analytics',
  }),
};


export const toWebRoute = (route: WebRoute): WebRoute =>
  !('as' in route) ? route : { href: route.as }

export const routeToHref = (route: WebRoute) => {
  const { href: routeHref } = toWebRoute(route)
  return `${Config.baseUrl}${routeHref}`
}