import { User, Login } from "types/model";

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
  userLoginData: any;
}
