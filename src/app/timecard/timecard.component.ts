import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ts-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Timecard');
  }

}
