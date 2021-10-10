import { WebRoute } from "./model";

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toDiscover: () => WebRoute;
  toArtist: () => WebRoute;
  toProfile: ({ id: string }) => WebRoute;
  toArtistProfile: (id: string) => WebRoute;
  toEditProfile: (id: string, tab: string) => WebRoute;
}
