import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'ts-app', // <my-app></my-app>
  providers: [],
  directives: [...ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor() {
  }
}
