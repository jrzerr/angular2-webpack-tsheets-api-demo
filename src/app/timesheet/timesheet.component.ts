import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Timesheet } from '../shared';
@Component({
  selector: 'ts-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit, OnChanges, OnDestroy {

  @Input() timesheet: Timesheet;
  @Input() selected: boolean;
  
  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Timesheet');
    console.log(this.selected);
  }

  ngOnChanges() {
    console.log(this.selected);
  }

  ngOnDestroy() {

  }

}
