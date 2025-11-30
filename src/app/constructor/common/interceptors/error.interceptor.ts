import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs';
import {TuiAlertService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {ServerErrorAlertComponent} from '@app/components/server-error-alert/server-error-alert.component';

let isCriticalErrorShown = false;

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const alerts = inject(TuiAlertService);
  const injector = inject(Injector);

  const logFormat = 'background: maroon; color: white';

  return next(req).pipe(
    tap({
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.groupCollapsed(`🔥 HTTP Error ${error.status}: ${req.url}`);
          console.log('Status:', error.status);
          console.log('Message:', error.message);
          console.groupEnd();

          switch (error.status) {
            case 0:
            case 500:
            case 502:
            case 503:
            case 504:
              if (isCriticalErrorShown) {
                return;
              }

              isCriticalErrorShown = true;

              const isNoConnection = error.status === 0;
              console.error(isNoConnection ? '%c Connection Refused (0)' : '%c Server Error (5xx)', logFormat);

              const content = new PolymorpheusComponent(
                ServerErrorAlertComponent,
                injector
              );

              alerts.open(content, {
                label: isNoConnection ? 'Связь потеряна' : 'Критическая ошибка',
                appearance: 'error',
                autoClose: 20000,
                closeable: false, // Убираем крестик, чтобы юзер использовал кнопку Reload
                data: {
                  message: isNoConnection
                    ? `Сервер недоступен (Status: 0). Проверьте соединение.`
                    : (error.error?.message || error.statusText || 'Unknown Server Error')
                }
              }).subscribe({
                // Если вдруг нужно сбросить флаг при закрытии алерта (но в нашем случае мы форсим релоад)
                // complete: () => isCriticalErrorShown = false
              });
              break;

            case 400:
              console.error('%c Bad Request 400', logFormat);
              break;

            case 401:
              // Здесь флаг не нужен, так как редирект обычно происходит мгновенно
              console.error('%c Unauthorized 401', logFormat);
              window.location.href = '/login' + window.location.hash;
              break;

            case 403:
              console.error('%c Forbidden 403', logFormat);
              break;

            case 404:
              console.error('%c Not Found 404', logFormat);
              router.navigate(['']);
              break;
          }
        }
      }
    })
  );
};
