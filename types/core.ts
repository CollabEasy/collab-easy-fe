import { WebRoute } from "./model";

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toDiscover: () => WebRoute;
  toArtist: () => WebRoute;
  toProfile: () => WebRoute;
  toArtistProfile: (id: string) => WebRoute;
  toEditProfile: (tab: string) => WebRoute;
  toCollabPage: (id: string) => WebRoute;
  toAllContestPage: () => WebRoute;
  toContestPage: (slug: string, tab: string) => WebRoute;
  toAboutUs: () => WebRoute;
  toTutorial: () => WebRoute;
  toFAQ: () => WebRoute;
  toTerms: () => WebRoute;
  toPrivacy: () => WebRoute;
  toContactUs: () => WebRoute;
  toGetInspired: () => WebRoute;
  toAnalyticsPage: () => WebRoute;
}
