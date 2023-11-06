import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as UserActions from '../actions/assessments.actions';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UserAssessmentEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          tap((response) => localStorage.setItem('token', response.token)),
          tap((response) => localStorage.setItem('role', response.role)),
          map((response) =>
            UserActions.loginSuccess({ userResponse: response })
          ),
          tap(() => this.router.navigate(['dashboard'])),
          catchError(() =>
            of(UserActions.loginError({ error: 'Login failed' }))
          )
        );
      })
    )
  );

  public getAssessments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAssessments),
      mergeMap(() => {
        return this.apiService.getAssessments().pipe(
          map((response) =>
            UserActions.AssessmentsLoaded({ assessmentResponse: response })
          ),
          catchError(() =>
            of(
              UserActions.AssessmentsLoadError({
                error: 'Assessments loading failed',
              })
            )
          )
        );
      })
    )
  );

  public getAssessmentReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAssessmentReport),
      mergeMap((action) => {
        return this.apiService.getAssessmentReport(action.assessmentId).pipe(
          map((response) =>
            UserActions.AssessmentReportLoaded({ reportResponse: response })
          ),
          catchError(() =>
            of(
              UserActions.AssessmentReportLoadError({
                error: 'Assessment reports loading failed',
              })
            )
          )
        );
      })
    )
  );

  public getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap((action) => {
        return this.apiService.getAllUsers().pipe(
          map((response) =>
            UserActions.UsersLoaded({ userResponse: response })
          ),
          catchError(() =>
            of(
              UserActions.UsersLoadError({
                error: 'Users loading failed',
              })
            )
          )
        );
      })
    )
  );

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
