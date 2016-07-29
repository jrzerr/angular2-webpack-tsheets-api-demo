import { Component, OnInit, Input, Output, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { Timesheet } from '../shared';
import { TimesheetEditComponent } from '../timesheet-edit';
import { SecondsToHoursPipe } from '../shared';

@Component({
  selector: 'ts-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  pipes: [SecondsToHoursPipe],
  directives: [TimesheetEditComponent]
})
export class TimesheetComponent implements OnInit, OnChanges, OnDestroy {

  @Input() timesheet: Timesheet;
  @Input() selected: boolean;
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

  onSave(timesheet : Timesheet) {
    this.saveTimesheet.emit(timesheet);
  }

}
