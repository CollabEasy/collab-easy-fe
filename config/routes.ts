import { AppRouteCreators } from 'types/core';
import { WebRoute } from 'types/model/webroute';
import { Config } from './config';

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toDiscover: () => ({ href: "/" }),
  toArtist: () => ({ href: "/discover-artist/" }),
  toAboutUs: () => ({ href: "/wondor/about-us"}),
  toFAQ: () => ({ href: "/faq"}),
  toTutorial: () => ({ href: "/wondor/tutorial"}),
  toPrivacy: () => ({ href: "/wondor/privacy" }),
  toContactUs: () => ({ href: "/wondor/contact-us" }),
  toTerms: () => ({ href: "/wondor/terms-and-policy" }),
  toGetInspired: () => ({ href: "/get-inspired" }),
  toAllContestPage: () => ({ href: "/all-contest" }),
  toRewardsInfoPage: () => ({ href: "/rewards-info" }),
  toAllCategoryPage: () => ({ href: "/all-categories" }),
  toAllProposalsPage: () => ({ href: "/proposals" }),
  toProfile: () => ({
    href: '/profile',
    as: `/profile/`,
  }),
  toArtistProfile: (slug) => ({
    href: '/artist/[slug]',
    as: `/artist/${slug}`,
  }),
  toArtistPortal: (tab) => ({
    href: '/portal/[tab]',
    as: `/portal/${tab}`,
  }),
  toCollabPage: (id) => ({
    href: '/collab/details/[id]',
    as: `/collab/details/${id}`,
  }),
  toProposalPage: (proposalId, title) => ({
    href: '/proposal/[proposalId]/[title]',
    as: `/proposal/${proposalId}/${title}`,
  }),
  toSendCollabRequestPage: (slug) => ({
    href: '/collab/[slug]',
    as: `/collab/${slug}`,
  }),
  toContestPage: (slug, tab) => ({
    href: '/contest/[slug]?tab=[tab]',
    as: `/contest/${slug}?tab=${tab}`,
  }),
  toCategoryWikiPage: (slug, title) => ({
    href: '/category/[slug]/[title]',
    as: `/category/${slug}/${title}`,
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