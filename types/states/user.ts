import { User } from "types/model";

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
