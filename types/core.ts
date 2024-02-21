import { WebRoute } from "./model";

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toDiscover: () => WebRoute;
  toCategoryArtistList: (slug: string, artistTitle: string) => WebRoute;
  toProfile: () => WebRoute;
  toArtistProfile: (slug: string) => WebRoute;
  toArtistPortal: (tab: string) => WebRoute;
  toCollabPage: (id: string) => WebRoute;
  toUserCollabPage: (slug: string) => WebRoute;
  toRewardsInfoPage: () => WebRoute;
 
  toAllCategoryPage: () => WebRoute;
  toAllProposalsPage: (category: string) => WebRoute;
  toGetInspired: (category: string) => WebRoute;
  toCategoryWikiPage: (slug: string, title: string) => WebRoute;
  toAboutUs: () => WebRoute;
  toTutorial: () => WebRoute;
  toFAQ: () => WebRoute;
  toTerms: () => WebRoute;
  toPrivacy: () => WebRoute;
  toContactUs: () => WebRoute;
  toAllBlogs: () => WebRoute;
  toAnalyticsPage: () => WebRoute;
  toProposalPage: (proposalId: string, title: string) => WebRoute;
  toBlogPage: (url: string) => WebRoute;
  toMyWondorPage: () => WebRoute;
  toMySearchPage: () => WebRoute;

  toContestLandingPage: () => WebRoute;
  toAllContestPage: () => WebRoute;
  toContestPage: (slug: string, tab: string) => WebRoute;
  toContestSubmissionPage: (slug: string, artistSlug: string) => WebRoute;
  toLoginPage: () => WebRoute;
  toBasicInfo: () => WebRoute;
}
