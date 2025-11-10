import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const requestWithApiUrl = req.clone({
      url: new URL(req.url, environment.apiUrl).href,
    });

    return next.handle(requestWithApiUrl);
  }
}
