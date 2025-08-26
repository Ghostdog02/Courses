import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



// @Injectable()
// export class AuthInterceptor implements HttpInterceptorFn {
//     constructor(private authService: AuthService) {}
    
//     intercept(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//         const authToken = this.authService.getToken();
//         const authRequest = req.clone({
//             headers: req.headers.set("Authorization", "Bearer " + authToken)  
//         });
        
//         return next(authRequest);
//     }
// }
export function authInterceptor(this: any, 
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authToken = inject(AuthService).getToken();
  const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
  });
    
  return next(authRequest);
}

