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
import { AdminGuard } from './admin.guard';
import { AuthService } from '../auth/service/auth.service';

export const AssessmentGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const apiService = inject(ApiService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }
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
