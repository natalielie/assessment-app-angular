import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from '../actions/users.actions';
import * as AssessmentsActions from '../actions/assessments.actions';
import * as AuthActions from '../actions/auth.actions';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/auth/service/auth.service';
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

  public getAssessments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssessmentsActions.getAssessments),
      mergeMap(() => {
        return this.apiService.getAssessments().pipe(
          map((response) =>
            AssessmentsActions.assessmentsLoaded({
              assessmentResponse: response,
            })
          ),
          catchError(() =>
            of(
              AssessmentsActions.assessmentsLoadError({
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
      ofType(AssessmentsActions.getAssessmentReport),
      mergeMap((action) => {
        return this.apiService.getAssessmentReport(action.assessmentId).pipe(
          map((response) =>
            AssessmentsActions.assessmentReportLoaded({
              reportResponse: response,
            })
          ),
          catchError(() =>
            of(
              AssessmentsActions.assessmentReportLoadError({
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
