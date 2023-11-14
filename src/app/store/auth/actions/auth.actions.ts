import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user.interface';

/** actions for login */
export const login = createAction(
  '[Login] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ userResponse: IUser }>()
);

export const loginError = createAction(
  '[Login] Login Error',
  props<{ error: string }>()
);
