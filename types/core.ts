export interface WebRoute {
  /**
   * This is understood as being a normal URL for use in non-NextJS <a>
   */
  href: string;
  as?: undefined | null;
}

export interface AppRouteCreators {
  toWondorHome: () => WebRoute;
  toLogin: () => WebRoute;
  toSignup: () => WebRoute;
  toDiscover: () => WebRoute;
}

export interface Home {

}

export interface AppState {
  home: Home
}

export interface GridData {
  src: string
  description: string
  alt: string
}