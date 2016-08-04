import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { timesheetsReducer } from './app/shared';
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}

bootstrap(AppComponent, [
    // These are dependencies of our App
    provideStore({timesheets: timesheetsReducer}),
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
  ])
  .catch(err => console.error(err));
