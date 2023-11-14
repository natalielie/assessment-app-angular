import { createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/users.actions';
import * as AssessmentsActions from '../actions/assessments.actions';
import { UserState, userInitialState } from '../user.state';

export const userReducers = createReducer(
  userInitialState,
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
      assessments: [],
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
  // on(AssessmentsActions.assessmentReportLoadError, (state, { error }) => {
  //   const result = {
  //     ...state,
  //     assessmentReport: [],
  //     error: error,
  //   };
  //   return result;
  // }),
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
      usersTotal: [],
      error: error,
    };
    return result;
  })
);
