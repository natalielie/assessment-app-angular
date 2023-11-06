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

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);
  if (authService.getToken() !== undefined) {
    return true;
  } else return false;

  // return store.select(selectIsAuth).pipe(
  //   map((isAuth) => {
  //     return isAuth ? true : router.parseUrl('');
  //   })
  // );
};
