import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

/**
 * an interceptor for adding a token to a header for every api request
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    if (request.headers.get('skip')) {
      return next
        .handle(request)
        .pipe(finalize(() => this.loaderService.hideLoader()));
    }
    request = request.clone({
      setHeaders: {
        'X-Token': localStorage.getItem('token')!,
      },
    });
    return next
      .handle(request)
      .pipe(finalize(() => this.loaderService.hideLoader()));
  }
}
