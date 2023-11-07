import { WebRoute } from "./model";

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toDiscover: () => WebRoute;
  toCategoryArtistList: (slug: string, artistTitle: string) => WebRoute;
  toProfile: () => WebRoute;
  toArtistProfile: (slug: string) => WebRoute;
  toArtistPortal: (tab: string) => WebRoute;
  toCollabPage: (id: string) => WebRoute;
  toSendCollabRequestPage: (slug: string) => WebRoute;
  toAllContestPage: () => WebRoute;
  toRewardsInfoPage: () => WebRoute;
  toContestPage: (slug: string, tab: string) => WebRoute;
  toAllCategoryPage: () => WebRoute;
  toAllProposalsPage: () => WebRoute;
  toCategoryWikiPage: (slug: string, title: string) => WebRoute;
  toAboutUs: () => WebRoute;
  toTutorial: () => WebRoute;
  toFAQ: () => WebRoute;
  toTerms: () => WebRoute;
  toPrivacy: () => WebRoute;
  toContactUs: () => WebRoute;
  toGetInspired: () => WebRoute;
  toAnalyticsPage: () => WebRoute;
  toProposalPage: (proposalId: string, title: string) => WebRoute;
}
