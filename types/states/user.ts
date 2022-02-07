import { User } from "types/model";

export interface UserState {
  user?: User;
  otherUser?: User;
  errors: any;
  isLoggedIn: boolean;
  preferences: any;
}
