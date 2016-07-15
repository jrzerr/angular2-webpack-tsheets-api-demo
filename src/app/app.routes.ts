import { provideRouter, RouterConfig } from '@angular/router';

import { ListComponent } from './list';
import { TimecardComponent } from './timecard';

export const routes: RouterConfig = [
  { path: '', component: TimecardComponent },
  { path: 'list', component: ListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
