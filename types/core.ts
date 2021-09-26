import { WebRoute } from "./model";

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toDiscover: () => WebRoute;
  toArtist: () => WebRoute;
  toProfile: ({ id: string }) => WebRoute;
  toArtistProfile: (typeOfArtist: string | string [], id: string) => WebRoute;
  toEditProfile: (id: string) => WebRoute;
}
