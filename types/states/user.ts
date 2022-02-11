import { User } from "types/model";

export interface UserState {
  user?: User;
  errors: any;
  isLoggedIn: boolean;
}
