import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from '../actions/users.actions';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class UserAssessmentEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  public getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap((action) => {
        return this.apiService.getAllUsers().pipe(
          map((response) =>
            UserActions.usersLoaded({ userResponse: response })
          ),
          catchError(() =>
            of(
              UserActions.usersLoadError({
                error: 'Users loading failed',
              })
            )
          )
        );
      })
    )
  );
}
