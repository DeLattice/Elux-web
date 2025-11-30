import {HttpInterceptorFn} from '@angular/common/http';
import {retry} from 'rxjs';

const MAX_RETRIES = 50;
const INITIAL_DELAY_MS = 10000;

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({count: MAX_RETRIES, delay: INITIAL_DELAY_MS}),
  );
};
