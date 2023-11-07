import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * an interceptor for adding a token to a header for every api request
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.get('skip')) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        'X-Token': localStorage.getItem('token')!,
      },
    });

    return next.handle(request);
  }
}
