import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate,
  ChangeDetectionStrategy
} from '@angular/core';
import { Timesheet } from '../shared';
import { TimesheetEditComponent } from '../timesheet-edit';
import { SecondsToHoursPipe } from '../shared';

@Component({
  selector: 'ts-timesheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  pipes: [SecondsToHoursPipe],
  directives: [TimesheetEditComponent],
  animations: [
      trigger('timesheetState', [
          state('selected', style({
              borderColor: '#ff0',
              height: '300px'
          })),
          state('notselected', style({
              borderColor: '#fff',
              height: '100px'
          })),
          transition('notselected => selected', animate('250ms ease-in')),
          transition('selected => notselected', animate('250ms ease-out'))
      ])
  ]
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

  onSave(timesheet: Timesheet) {
    this.saveTimesheet.emit(timesheet);
  }

}
