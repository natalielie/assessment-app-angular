import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LOGIN_ROUTE } from '../constants/constants';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../store/selectors/assessments.selectors';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsAuth).pipe(
    map((isAuth) => {
      return isAuth ? true : router.parseUrl('');
    })
  );
};
