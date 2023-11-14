import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          tap((response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            this.router.navigate(['dashboard']);
          }),
          map((response) =>
            AuthActions.loginSuccess({ userResponse: response })
          ),
          catchError(() =>
            of(
              AuthActions.loginError({
                error: 'Your email or password is incorrect, try again',
              })
            )
          )
        );
      })
    )
  );
}
