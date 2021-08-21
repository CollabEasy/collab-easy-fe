import { UserState } from './states/user.state';
import { HomeState } from './states/home.state';

export interface WebRoute {
  /**
   * This is understood as being a normal URL for use in non-NextJS <a>
   */
  href: string;
  as?: undefined | null | string;
}

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toLogin: () => WebRoute;
  toSignup: () => WebRoute;
  toDiscover: () => WebRoute;
  toArtist: () => WebRoute;
  toProfile: ({ id: string }) => WebRoute;
  toArtistProfile: (typeOfArtist: string | string [], id: string) => WebRoute;
}

export interface AppState {
  home: HomeState;
  user: UserState;
}