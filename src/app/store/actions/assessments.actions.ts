import { createAction, props } from '@ngrx/store';
import { IAssessment, IUser } from 'src/app/interfaces/user.interface';

export const login = createAction(
  '[Cat Gallery] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Cat Gallery] Login Success',
  props<{ userResponse: IUser }>()
);

export const loginError = createAction(
  '[Cat Gallery] Login Error',
  props<{ error: string }>()
);

export const getAssessments = createAction('[Cat Gallery] Get Assessments');

export const AssessmentsLoaded = createAction(
  '[Cat Gallery] Assessments Loaded',
  props<{ imageResponse: IAssessment[] }>()
);

export const AssessmentsLoadError = createAction(
  '[Cat Gallery] Assessments Not Loaded',
  props<{ error: string }>()
);

export const getAssessmentsDetails = createAction(
  '[Cat Gallery] Get Assessments Details'
);

export const AssessmentsDetailsLoaded = createAction(
  '[Cat Gallery] Assessments Details Loaded',
  props<{ imageResponse: IAssessment[] }>()
);

export const AssessmentsDetailsLoadError = createAction(
  '[Cat Gallery] Assessments Details Not Loaded',
  props<{ error: string }>()
);

export const getUsers = createAction('[Cat Gallery] Get All Users');

export const UsersLoaded = createAction(
  '[Cat Gallery] Users Loaded',
  props<{ userResponse: IUser[] }>()
);

export const UsersLoadError = createAction(
  '[Cat Gallery] Users Not Loaded',
  props<{ error: string }>()
);
