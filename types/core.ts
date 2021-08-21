import { UserState } from './states/user.state';
import { HomeState } from './states/home.state';
import { WebRoute } from './model/web-route.model';


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