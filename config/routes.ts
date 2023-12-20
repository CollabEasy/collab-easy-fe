import { AppRouteCreators } from 'types/core';
import { WebRoute } from 'types/model/webroute';
import { Config } from './config';

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toDiscover: () => ({ href: "/" }),
  toAllBlogs: ()=> ({ href: "/wondor/blogs"}),
  toAboutUs: () => ({ href: "/wondor/about-us"}),
  toFAQ: () => ({ href: "/wondor/faqs"}),
  toTutorial: () => ({ href: "/wondor/how-to-use-wondor"}),
  toPrivacy: () => ({ href: "/wondor/privacy" }),
  toContactUs: () => ({ href: "/wondor/contact-us" }),
  toTerms: () => ({ href: "/wondor/terms-and-policy" }),
  toGetInspired: () => ({ href: "/content-creation-ideas-for-artists" }),
  toAllContestPage: () => ({ href: "/art-contests-for-artists" }),
  toRewardsInfoPage: () => ({ href: "/rewards-info" }),
  toAllCategoryPage: () => ({ href: "/collab-categories" }),
  toAllProposalsPage: (category) => ({ 
    href: '/collab-proposals-for-artists?category=[category]',
    as: `/collab-proposals-for-artists?category=${category}`,
  }),
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
  toUserCollabPage: (slug) => ({
    href: '/collab/artist/[slug]',
    as: `/collab/artist/${slug}`,
  }),
  toProposalPage: (proposalId, title) => ({
    href: '/collab-proposal/[proposalId]/[title]',
    as: `/collab-proposal/${proposalId}/${title}`,
  }),
  toBlogPage: (url) => ({
    href: '/blog/[url]',
    as: `/blog/${url}`,
  }),
  toContestPage: (slug, tab) => ({
    href: '/contest/[slug]?tab=[tab]',
    as: `/contest/${slug}?tab=${tab}`,
  }),
  toCategoryWikiPage: (slug, title) => ({
    href: '/category/[slug]/wiki/[title]',
    as: `/category/${slug}/wiki/${title}`,
  }),
  toCategoryArtistList: (slug, artistTitle) => ({ 
    href: '/category/[slug]/[artistTitle]-seeking-collab',
    as: `/category/${slug}/${artistTitle}-seeking-collab`, 
  }),
  toAnalyticsPage: () => ({
    href: '/admin/analytics',
    as: '/admin/analytics',
  }),
  toMyWondorPage: () => ({
    href: '/my-wondor',
    as: '/my-wondor',
  }),
  toMySearchPage: () => ({
    href: '/search',
    as: '/search',
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