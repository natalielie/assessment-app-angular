import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../reducers/assessments.reducers';

export const authFeature = createFeatureSelector<UserState>('auth');

export const selectUserData = createSelector(
  authFeature,
  (state) => state.userData
);

export const selectIsAuth = createSelector(
  authFeature,
  (state) => !!state.userData!.token
);

export const selectToken = createSelector(
  authFeature,
  (state) => state.userData!.token
);
