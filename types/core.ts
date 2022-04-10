import { WebRoute } from "./model";

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toDiscover: () => WebRoute;
  toArtist: () => WebRoute;
  toProfile: () => WebRoute;
  toArtistProfile: (id: string) => WebRoute;
  toEditProfile: (action: string, tab: string) => WebRoute;
  toCollabPage: (id: string) => WebRoute;
  toAboutUs: () => WebRoute;
  toFAQ: () => WebRoute;
  toTerms: () => WebRoute;
  toPrivacy: () => WebRoute;
  toContactUs: () => WebRoute;
}
