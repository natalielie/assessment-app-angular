import { IUser } from 'src/app/interfaces/user.interface';

export interface AuthState {
  activeUser: IUser | null;
}

export const authInitialState: AuthState = {
  activeUser: null,
};
