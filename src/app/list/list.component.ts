import {
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  style,
  transition,
  animate,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';

import { Timesheet } from '../shared';
import { TimesheetComponent } from  '../timesheet';

@Component({
  selector: 'ts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [],
  directives: [TimesheetComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('timesheetState', [
      state('*', style({
        opacity: '1'
      })),
      transition('void => *', [
        animate('500ms ease-in', style({ opacity: '1' }))
        ]),
    ])
  ]
})
export class ListComponent implements OnInit, OnDestroy {

  public TIMESHEET_ID_PREFIX: string;
  @Input() timesheets: Timesheet[];
  @Input() selectedId: number;
  @Output() onSelectTimesheet: EventEmitter<any> = new EventEmitter();
  @Output() onSaveTimesheet: EventEmitter<any> = new EventEmitter();
  constructor() {
    // Do stuff
    this.TIMESHEET_ID_PREFIX = 'timesheet-view';
  }

  selectTimesheet(id: number) {
    this.onSelectTimesheet.emit(id);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  saveTimesheet(timesheet: Timesheet) {
    this.onSaveTimesheet.emit(timesheet);
  }

  trackById(index: number, timesheet: Timesheet) {
    return timesheet._id;
  }
}
