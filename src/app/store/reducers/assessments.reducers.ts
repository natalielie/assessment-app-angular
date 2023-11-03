import { createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/assessments.actions';
import { IAssessment, IUser } from 'src/app/interfaces/user.interface';

export interface UserState {
  userData: IUser | null;
  assessmentsData: IAssessment[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  assessmentsData: null,
  loading: false,
  error: null,
};

export const imageReducers = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { userResponse }) => {
    const result = {
      ...state,
      loading: true,
      userData: userResponse,
      error: null,
    };
    return result;
  }),
  on(UserActions.loginError, (state, { error }) => {
    const result = {
      ...state,
      loading: true,
      userData: null,
      error: error,
    };
    return result;
  })
);

// export const filterReducers = createReducer(
//   initialState,
//   on(
//     UserActions.changeFilter,
//     (state, { filter: { breeds, quantity, hasBreed } }) => {
//       return { ...state, filter: { breeds, quantity, hasBreed } };
//     }
//   )
// );
