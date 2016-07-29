import { Component, OnInit, Input, Output, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { Timesheet } from '../shared';
import { SecondsToHoursPipe } from '../shared';

@Component({
  selector: 'ts-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.scss'],
  pipes: [SecondsToHoursPipe],
})
export class TimesheetEditComponent implements OnInit, OnChanges, OnDestroy {

  @Input() timesheet: Timesheet;
  @Output() saveTimesheet: EventEmitter<any> = new EventEmitter();
  constructor() {
    // Do stuff
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngOnDestroy() {

  }

  onSave(timesheet) {
    this.saveTimesheet.emit(timesheet);
  }

}
