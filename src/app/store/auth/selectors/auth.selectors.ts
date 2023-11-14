import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth.state';

export const userFeature = createFeatureSelector<AuthState>('activeUser');

export const selectActiveUserData = createSelector(
  userFeature,
  (state) => state
);
