import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TestInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': 'BearerYourAccessTokenHere'
      }
    });

    return next.handle(modifiedRequest)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('Interceptor - Response:', event);
          }
          return event;
        }),

        catchError((error: HttpErrorResponse) => {
          console.error('Interceptor - Error:', error);
          return throwError(error);
        })
      );
  }
}

