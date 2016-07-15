import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Timesheet } from './timesheet';
// import { TIMESHEETS } from './mock-timesheets';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimesheetService {

  private timesheetsUrl = process.env.API_URL + '/api/v1/timesheets?start_date=2016-07-01&end_date=2016-07-15';

  constructor (private http: Http) {}

  getTimesheets(): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    return this.http.get(this.timesheetsUrl, { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
      let body = res.json();
      let timesheets = Object.keys(body.results.timesheets).map(function(timesheetId) {
        return body.results.timesheets[timesheetId];
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
