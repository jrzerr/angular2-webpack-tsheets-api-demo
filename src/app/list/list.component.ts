import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  directives: [ROUTER_DIRECTIVES]
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute) {
    // Do stuff
  }
  private paramsSub: any;

  ngOnInit() {
    console.log('Hello List');
    this.paramsSub = this.route.params.subscribe(params => {
      console.log(params);
    });
  }

}
