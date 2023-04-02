import { User } from "types/model";

export interface UserState {
  profile_pic_url: any;
  user?: User;
  otherUser?: User;
  errors: any;
  isLoggedIn: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPrefs: string;
  preferences: any;
  artCategories: string[];
  isFetchingUser: boolean;
}
