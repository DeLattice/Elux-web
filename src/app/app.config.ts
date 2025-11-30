import {provideEventPlugins} from "@taiga-ui/event-plugins";
import {TUI_ALERT_POSITION} from "@taiga-ui/core";
import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection,} from "@angular/core";
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from "@angular/router";

import {routes} from "./app.routes";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {AuthInterceptor} from "@constructor/common/interceptors/auth.interceptor";
import {ApiInterceptor} from "@constructor/common/interceptors/api.interceptor";
import {provideNuMonacoEditorConfig} from '@ng-util/monaco-editor';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {retryInterceptor} from '@constructor/common/interceptors/retry.interceptor';
import {errorInterceptor} from '@constructor/common/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEventPlugins(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideNuMonacoEditorConfig({baseUrl: 'assets/monaco-editor'}),
    provideHttpClient(withInterceptorsFromDi(), withFetch(), withInterceptors([retryInterceptor, errorInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        get scrollPositionRestoration() {
          return history.state?.disableScroll ? "disabled" : "enabled";
        },
      }),
      withViewTransitions(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: TUI_ALERT_POSITION,
      useValue: "auto 1em 0 auto",
    },
  ],
};
