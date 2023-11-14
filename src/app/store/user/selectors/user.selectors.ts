import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../user.state';

export const userFeature = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
  userFeature,
  (state) => state.usersTotal
);

export const selectAssessmentsData = createSelector(
  userFeature,
  (state) => state.assessments
);

export const selectAssessmentReport = createSelector(
  userFeature,
  (state) => state.assessmentReport
);
