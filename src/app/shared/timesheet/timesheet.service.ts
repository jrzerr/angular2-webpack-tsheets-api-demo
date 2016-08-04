import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DATE_FORMAT_STRING_LONG, DATE_FORMAT_STRING_SHORT } from '../time-helpers';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Store, Action, ActionReducer } from '@ngrx/store';

import { Timesheet } from './timesheet';
// import { TIMESHEETS } from './mock-timesheets';
import { Observable } from 'rxjs/Observable';



export interface AppStore {
  timesheets: Timesheet[];
}

export const timesheetsReducer: ActionReducer<Timesheet[]> = (state: Timesheet[] = [], action: Action) => {
  let state_copy: Timesheet[];
  switch (action.type) {
    case 'SET_TIMESHEETS':
      return action.payload
    case 'ADD_TIMESHEET':
      return [
        ...state,
        action.payload
      ]
    case 'EDIT_TIMESHEET':
      state_copy = [...state];
      let timesheet_id_to_edit: number = state_copy.findIndex((timesheet) => {
        if (timesheet.id === action.payload.id) {
          return true;
        } else {
          return false;
        }
      });
      if (timesheet_id_to_edit > -1) {
        state_copy[timesheet_id_to_edit] = action.payload;
      }
      return state_copy;
    case 'DELETE_TIMESHEET':
      return state;
    default:
      return state;
  }
};

@Injectable()
export class TimesheetService {

  private timesheetsUrl = process.env.API_URL + '/api/v1/timesheets';
  public timesheets: Observable<Array<Timesheet>>;
  constructor (private http: Http, private _store: Store<AppStore>) {
    this.timesheets = _store.select(state => state.timesheets);
  }
  getTimesheetsListUrl(): string {
    const today = new Date();
    const dayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return this.timesheetsUrl + '?start_date=2016-07-01&end_date=' + dayString;
  }

  // fetch timesheets then update the store
  getTimesheets(): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    let getRequest = this.http.get(this.getTimesheetsListUrl(), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);

    getRequest.subscribe(timesheets => {
      this._store.dispatch({type: 'SET_TIMESHEETS', payload: timesheets});
    });

    return getRequest;
  }

  editTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    let options = new RequestOptions({ headers: headers });

    let putRequest = this.http.put(this.timesheetsUrl, {
        data: timesheets.map(this.timesheetToApiMapper)
      }, options)
    .map(this.extractData)
    .catch(this.handleError);

    putRequest.subscribe(new_timesheets => {
      new_timesheets.map(timesheet => {
        this._store.dispatch({ type: 'EDIT_TIMESHEET', payload: timesheet });
      });
    });

    return putRequest;
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
