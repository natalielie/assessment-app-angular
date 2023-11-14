import { createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { AuthState, authInitialState } from '../auth.state';

export const authReducers = createReducer(
  authInitialState,
  on(AuthActions.login, (state, { email, password }) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(AuthActions.loginSuccess, (state, { userResponse }) => {
    const result = {
      ...state,
      user: userResponse,
    };
    return result;
  }),
  on(AuthActions.loginError, (state, { error }) => {
    const result = {
      ...state,
      user: null,
      error: error,
    };
    return result;
  })
);
