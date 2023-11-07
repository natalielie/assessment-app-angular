import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../reducers/assessments.reducers';

export const userFeature = createFeatureSelector<UserState>('userData');

export const selectActiveUserData = createSelector(
  userFeature,
  (state) => state
);

export const selectAllUsers = createSelector(
  userFeature,
  (state) => state.usersTotal
);

// export const selectIsAuth = createSelector(
//   userFeature,
//   (state) => !!state.user!.token
// );

// export const selectToken = createSelector(
//   userFeature,
//   (state) => state.user!.token
// );

export const selectAssessmentsData = createSelector(
  userFeature,
  (state) => state.assessments
);

export const selectAssessmentReport = createSelector(
  userFeature,
  (state) => state.assessmentReport
);
