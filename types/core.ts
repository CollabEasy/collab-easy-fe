import { WebRoute } from "./model";

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toDiscover: () => WebRoute;
  toArtist: () => WebRoute;
  toProfile: () => WebRoute;
  toArtistProfile: (id: string) => WebRoute;
  toEditProfile: () => WebRoute;
}
