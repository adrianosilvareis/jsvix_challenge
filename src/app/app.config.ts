import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { transactionsReducer } from './store/transaction.reduce';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    provideState({ name: 'transaction', reducer: transactionsReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
