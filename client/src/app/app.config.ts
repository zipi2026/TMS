// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };

import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ConfigurationService } from './services/configuration.service';
import { AuthStateService } from './services/auth-state.service';
import { credentialsInterceptor } from './services/credentials.interceptor';
import { firstValueFrom, filter, take } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),

    provideHttpClient(
      withFetch(),
      withInterceptors([credentialsInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthSession,
      deps: [AuthStateService, ConfigurationService],
      multi: true
    },
  ]
};


export function initConfigValues(config: ConfigurationService) {
  return (() => config.initConfiguration('/config'));
}

export function initAuthSession(authState: AuthStateService, config: ConfigurationService) {
  return () => {
    // Must wait for config to load first — APP_INITIALIZERs run in parallel,
    // so config might not be ready when this fires.
    return config.initConfiguration('/config').then(() => {
      authState.restoreSession();
      return firstValueFrom(
        authState.sessionChecked$.pipe(
          filter(checked => checked),
          take(1)
        )
      );
    });
  };
}


