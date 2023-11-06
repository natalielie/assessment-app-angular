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
import { Store } from '@ngrx/store';
import { selectUserData } from '../store/selectors/assessments.selectors';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);

  // const user$ = store.select(selectUserData);

  // user$.subscribe((value) => {
  //   if (value?.role === 'admin') {
  //     return true;
  //   } else return false;
  // });
  return authService.isAdmin();
  // return loginService.isLoggedIn().pipe(
  //   map((loggedIn) =>
  //     loggedIn
  //       ? true
  //       : router.createUrlTree([router.parseUrl(LOGIN_ROUTE)], {
  //           queryParams: { loggedOut: true, origUrl: state.url },
  //         })
  //   ),
  //   catchError((err) => {
  //     router.navigate([LOGIN_ROUTE], {
  //       queryParams: { loggedOut: true, origUrl: state.url },
  //     });
  //     return of(false);
  //   })
  // );
};
