import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
  CanActivate,
  UrlTree,
} from '@angular/router';
import { dashboardPath } from '../shared/globals';
import { ApiService } from '../services/api.service';
import { Observable, map, take, tap } from 'rxjs';

export const AssessmentGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  let isUsersAssessment!: boolean;

  return apiService.getAssessments().pipe(
    tap((assessments) =>
      assessments.forEach((assessment) => {
        if (assessment.id === +route.params['id']) {
          return true;
        }
        return router.navigate([dashboardPath]);
      })
    ),
    take(1),
    map((assessment) => !!assessment)
  );
};
