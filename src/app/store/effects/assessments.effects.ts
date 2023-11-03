import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as UserActions from '../actions/assessments.actions';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class CatGalleryEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          tap((response) => localStorage.setItem('token', response.token)),
          map((response) =>
            UserActions.loginSuccess({ userResponse: response })
          ),
          catchError(() =>
            of(UserActions.loginError({ error: 'Login failed' }))
          )
        );
      })
    )
  );

  // public loadImages$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.getImages),
  //     mergeMap((action) =>
  //       this.catImageService.getAllImages(action.quantity.toString()).pipe(
  //         map((response) =>
  //           UserActions.imagesLoaded({ imageResponse: response })
  //         ),
  //         catchError((error) => EMPTY)
  //       )
  //     )
  //   )
  // );

  // public loadFilteredImages$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.getFilteredImages),
  //     mergeMap((action) =>
  //       this.catImageService.getCatsFilteredImages(action.filter).pipe(
  //         map((response) =>
  //           UserActions.imagesLoaded({ imageResponse: response })
  //         ),
  //         catchError((error) => EMPTY)
  //       )
  //     )
  //   )
  // );
}
