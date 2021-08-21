
import { User } from 'types/model/user.model';

export interface UserState {
    user: User;
    isLoggedIn: boolean;
}