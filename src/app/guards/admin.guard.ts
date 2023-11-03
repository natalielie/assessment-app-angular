import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { LOGIN_ROUTE } from '../constants/constants';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  return loginService.isLoggedIn().pipe(
    map((loggedIn) =>
      loggedIn
        ? true
        : router.createUrlTree([router.parseUrl(LOGIN_ROUTE)], {
            queryParams: { loggedOut: true, origUrl: state.url },
          })
    ),
    catchError((err) => {
      router.navigate([LOGIN_ROUTE], {
        queryParams: { loggedOut: true, origUrl: state.url },
      });
      return of(false);
    })
  );
};
