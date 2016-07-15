import { Component, OnInit, Input, OnChanges, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Timesheet } from '../shared';

@Pipe({ name: 'tsSecondsToHours'})
export class SecondsToHoursPipe implements PipeTransform {
  transform(seconds: number): string {
    console.log(seconds / 360);
    return '50:00';
  }
}

@Component({
  selector: 'ts-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  pipes: [SecondsToHoursPipe],
})
export class TimesheetComponent implements OnInit, OnChanges, OnDestroy {

  @Input() timesheet: Timesheet;
  @Input() selected: boolean;

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Timesheet');
  }

  ngOnChanges() {
  }

  ngOnDestroy() {

  }

}
