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
  toRewardsInfoPage: () => ({ href: "/rewards-info" }),
  toAllCategoryPage: () => ({ href: "/all-categories" }),
  toAllProposalsPage: () => ({ href: "/proposals" }),
  toProfile: () => ({
    href: '/profile',
    as: `/profile/`,
  }),
  toArtistProfile: (id) => ({
    href: '/artist/profile/[id]',
    as: `/artist/profile/${id}`,
  }),
  toEditProfile: (action, tab) => ({
    href: '/artist/settings/[action]?tab=[tab]',
    as: `/artist/settings/${action}?tab=${tab}`,
  }),
  toCollabPage: (id) => ({
    href: '/collab/details/[id]',
    as: `/collab/details/${id}`,
  }),
  toSendCollabRequestPage: (slug) => ({
    href: '/collab/[slug]',
    as: `/collab/${slug}`,
  }),
  toContestPage: (slug, tab) => ({
    href: '/contest/[slug]?tab=[tab]',
    as: `/contest/${slug}?tab=${tab}`,
  }),
  toCategoryPage: (slug) => ({
    href: '/category/wiki/[slug]',
    as: `/category/wiki/${slug}`,
  }),
  toAnalyticsPage: () => ({
    href: '/admin/analytics',
    as: '/admin/analytics',
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