import { ActionReducerMap } from '@ngrx/store';
import { UserState, userInitialState } from './user/user.state';
import { AuthState, authInitialState } from './auth/auth.state';
import { authReducers } from './auth/reducers/auth.reducers';
import { userReducers } from './user/reducers/user.reducers';

export const userStateKey = 'user';
export const authStateKey = 'auth';

export interface AppState {
  [userStateKey]: UserState;
  [authStateKey]: AuthState;
}

export const initialState: AppState = {
  [userStateKey]: userInitialState,
  [authStateKey]: authInitialState,
};

export const appReducers: ActionReducerMap<AppState> = {
  [userStateKey]: userReducers,
  [authStateKey]: authReducers,
};
