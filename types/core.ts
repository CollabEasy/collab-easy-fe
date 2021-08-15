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
}

export interface HomeState {
  homeDetails: any;
  loginModalDetails: LoginModalDetails;
}

export interface LoginModalDetails {
  openModal: boolean;
}

export interface UserState {
  user: User;
  isLoggedIn: boolean;
}

export interface AppState {
  home: HomeState;
  user: UserState;
}

export interface GridData {
  src: string;
  description: string;
  alt: string;
  id?: number | string;
}

export interface User {
  userId: string;
  userHandle: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: number;
  country: String;
  profilePicUrl: String;
  timezone: String;
  bio: String;
  age: number;
  lastActive: number;
  gender: string;
  createdAt: number;
  updatedAt: number;
}
