import { Component, OnInit, Input, OnChanges, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Timesheet } from '../shared';

@Pipe({ name: 'tsSecondsToHours'})
export class SecondsToHoursPipe implements PipeTransform {
  transform(sec_num: number): string {
    const hours   = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);

    let hours_str = hours.toString();
    let minutes_str = minutes.toString();
    let seconds_str = seconds.toString();

    if (hours   < 10) {
      hours_str = '0' + hours;
    }
    if (minutes < 10) {
      minutes_str = '0' + minutes;
    }
    if (seconds < 10) {
      seconds_str = '0' + seconds;
    }

    return hours_str + ':' + minutes_str + ':' + seconds_str;
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
