import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { notificationSetting } from '../shared/common';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private matSnackBar: MatSnackBar
  ){}
  options: any = notificationSetting;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            this.matSnackBar.open("this is client side error", 'fail', this.options);
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}