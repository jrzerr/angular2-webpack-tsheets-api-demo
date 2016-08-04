import { PipeTransform, Pipe } from '@angular/core';

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

'2013-08-08T15:00:00-06:00'
export const DATE_FORMAT_STRING_LONG = 'YYYY-MM-DDThh:mm:ssZ';
export const DATE_FORMAT_STRING_SHORT = 'YYYY-MM-DD';
