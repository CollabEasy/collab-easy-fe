import { User } from "types/model";

export interface UserState {
  user?: User;
  otherUser?: User;
  errors: any;
  isLoggedIn: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPrefs: string;
  isUpdatingProfilePic: boolean;
  showProfilePictureUpdateModal: boolean;
  preferences: any;
  artCategories: string[];
  isFetchingUser: boolean;
}
