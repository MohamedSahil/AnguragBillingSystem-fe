import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable,throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
    private notificationService:NotificationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService)
    let tokenizedReq:HttpRequest<any>;
    if (authService.loggedIn()) {
      //console.log("Logged in");
      tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
        }
      )
      
    }else{
      //console.log("Not Logged in");
      tokenizedReq = req.clone({
        headers: req.headers
      }
      );
    }
    return next.handle(tokenizedReq).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
            console.log(err.status);
            console.log(err.statusText);
              if (err.status === 401) {
                authService.logout();
                window.location.href = "/login";
                this.notificationService.showInfo("Your jwt token has been expired!")
              }
        }
        return throwError(err);
      })
      );
   } 
}
