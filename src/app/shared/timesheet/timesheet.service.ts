import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DATE_FORMAT_STRING_LONG, DATE_FORMAT_STRING_SHORT } from '../time-helpers';
import * as moment from 'moment'
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

import { Timesheet } from './timesheet';
// import { TIMESHEETS } from './mock-timesheets';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimesheetService {

  private timesheetsUrl = process.env.API_URL + '/api/v1/timesheets';

  constructor (private http: Http, private _store: Store<any>) {}
  getTimesheetsListUrl(): string {
    const today = new Date();
    const dayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return this.timesheetsUrl + '?start_date=2016-07-01&end_date=' + dayString;
  }

  getTimesheets(): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    this._store.select('timesheets')
      .subscribe(timesheets => {
        console.log(timesheets);
      });
    return this.http.get(this.getTimesheetsListUrl(), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  editTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.timesheetsUrl, {
        data: timesheets.map(this.timesheetToApiMapper)
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
    let timesheet_copy: any = _.pick(timesheet, ['id', 'date', 'start', 'end', 'jobcode_id', 'notes', 'customfields']);

    if (timesheet_copy.date !== undefined) {
      timesheet_copy.date = moment(timesheet_copy.date).format(DATE_FORMAT_STRING_SHORT);
    }

    if (timesheet_copy.start !== undefined) {
      timesheet_copy.start = moment(timesheet_copy.start).format(DATE_FORMAT_STRING_LONG);
    }

    if (timesheet_copy.end !== undefined) {
      timesheet_copy.end = moment(timesheet_copy.end).format(DATE_FORMAT_STRING_LONG);
    }

    return timesheet_copy;
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


const initialState = {
  timesheets: []
};

export const timesheets = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TIMESHEET':
      var state_copy = Object.assign({}, state);
      state_copy.timesheets.push(action.payload);
      return state_copy;
    case 'EDIT_TIMESHEET':
      return state;
    case 'DELETE_TIMESHEET':
      return state;
    default:
      return state;
  }
};
