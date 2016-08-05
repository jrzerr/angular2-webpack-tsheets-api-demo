import { provideRouter, RouterConfig } from '@angular/router';

import { ListContainerComponent } from './list';
import { TimecardComponent } from './timecard';

export const routes: RouterConfig = [
  { path: '', component: TimecardComponent },
  { path: 'list', component: ListContainerComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
