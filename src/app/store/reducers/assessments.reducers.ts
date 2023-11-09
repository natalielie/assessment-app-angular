import { createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/users.actions';
import * as AssessmentsActions from '../actions/assessments.actions';
import * as AuthActions from '../actions/auth.actions';

import {
  IAssessment,
  IAssessmentReport,
  IUser,
} from 'src/app/interfaces/user.interface';

export interface UserState {
  user: IUser | null;
  assessments: IAssessment[] | null;
  assessmentReport: IAssessmentReport | null;
  usersTotal: IUser[] | null;
  error: string | null;
}

export interface GlobalState {
  userData: UserState;
}

const initialState: UserState = {
  user: null,
  assessments: null,
  assessmentReport: null,
  usersTotal: null,
  error: null,
};

export const initialGlobalState: GlobalState = {
  userData: initialState,
};

export const userReducers = createReducer(
  initialState,
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
  }),
  on(AssessmentsActions.getAssessments, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(AssessmentsActions.assessmentsLoaded, (state, { assessmentResponse }) => {
    const result = {
      ...state,
      assessments: assessmentResponse,
    };
    return result;
  }),
  on(AssessmentsActions.assessmentsLoadError, (state, { error }) => {
    const result = {
      ...state,
      assessments: null,
      error: error,
    };
    return result;
  }),
  on(AssessmentsActions.getAssessmentReport, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(AssessmentsActions.assessmentReportLoaded, (state, { reportResponse }) => {
    const result = {
      ...state,
      assessmentReport: reportResponse,
    };
    return result;
  }),
  on(AssessmentsActions.assessmentReportLoadError, (state, { error }) => {
    const result = {
      ...state,
      assessmentReport: null,
      error: error,
    };
    return result;
  }),
  on(UserActions.getUsers, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(UserActions.usersLoaded, (state, { userResponse }) => {
    const result = {
      ...state,
      usersTotal: userResponse,
    };
    return result;
  }),
  on(UserActions.usersLoadError, (state, { error }) => {
    const result = {
      ...state,
      usersTotal: null,
      error: error,
    };
    return result;
  })
);
