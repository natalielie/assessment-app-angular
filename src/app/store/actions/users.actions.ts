import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user.interface';

/** actions for getting all users for an admin */
export const getUsers = createAction('[Users] Get All Users');

export const usersLoaded = createAction(
  '[Users] Users Loaded',
  props<{ userResponse: IUser[] }>()
);

export const usersLoadError = createAction(
  '[Users] Users Not Loaded',
  props<{ error: string }>()
);
