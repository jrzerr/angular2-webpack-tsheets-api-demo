import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Timesheet } from './timesheet';
// import { TIMESHEETS } from './mock-timesheets';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimesheetService {

  private timesheetsUrl = process.env.API_URL + '/api/v1/timesheets';

  constructor (private http: Http) {}
  getTimesheetsListUrl(): string {
    const today = new Date();
    const dayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return this.timesheetsUrl + '?start_date=2016-07-01&end_date=' + dayString;
  }

  getTimesheets(): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    return this.http.get(this.getTimesheetsListUrl(), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  editTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    let options = new RequestOptions({ headers: headers });
    console.log(headers);
    return this.http.put(this.timesheetsUrl, {
        data: JSON.stringify(timesheets.map(this.timesheetToApiMapper))
      }, 
      options
      )
    .map(this.extractData)
    .catch(this.handleError);
  }
// "2013-08-08T15:00:00-06:00"
  editTimesheet(timesheet: Timesheet): Observable<Timesheet[]> {
    return this.editTimesheets([timesheet]);
  }

  timesheetToApiMapper(timesheet: Timesheet): any {
    let timesheet_copy = Object.assign({}, timesheet);
    delete timesheet_copy.last_modified;
    
    if (timesheet_copy.date !== undefined) {
      timesheet_copy.date = new DatePipe().transform(timesheet_copy.date, 'yyyy-MM-dd');
    }

    if (timesheet_copy.start !== undefined) {
      timesheet_copy.start = new DatePipe().transform(timesheet_copy.start, 'yyyy-MM-ddThh:mm:ssz');
    }

    console.log(timesheet_copy);
    return timesheet;
  }

  private extractData(res: Response): Timesheet[] {
      let body = res.json();
      let timesheets = Object.keys(body.results.timesheets).map(function(timesheetId) {
        return body.results.timesheets[timesheetId];
      }).map(timesheet => {
        return new Timesheet(timesheet);
      });
      return timesheets;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
