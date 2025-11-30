import { Injectable, inject } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { AuthenticationService } from "../../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthenticationService);


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.selectToken()

    const authRequest = token ? this.setAuthHeader(request, token) : request;

    return next.handle(authRequest);
  }

  private setAuthHeader(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: accessToken
      }
    })
  }
}
