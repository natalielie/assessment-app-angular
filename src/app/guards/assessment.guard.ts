import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivateFn,
  UrlTree,
} from '@angular/router';
import { dashboardPath } from '../shared/globals';
import { ApiService } from '../services/api.service';
import { Observable, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

export const AssessmentGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  let isUsersAssessment!: boolean;

  return apiService.getAssessments().pipe(
    tap((assessments) =>
      assessments.forEach((report) => {
        if (report.id === +route.params['id']) {
          isUsersAssessment = true;
        }
      })
    ),
    take(1),
    map((assessment) => isUsersAssessment ?? router.navigate([dashboardPath]))
  );
};
