import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';

export function errorInterceptor(
  this: any,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    let dialog = inject(MatDialog);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred';
            if (error.error.message) {
                errorMessage = error.error.message;
            }
            dialog.open(ErrorComponent, {
              data: {message: errorMessage},
              width: '400px',
              disableClose: false,
            });
            // console.log(error);
            // alert(error.error.message);
            return throwError(() => {
                return error;
            });
        })
    );
}
