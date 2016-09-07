import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DATE_FORMAT_STRING_LONG, DATE_FORMAT_STRING_SHORT } from '../time-helpers';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable }     from 'rxjs/Observable';
import { Timesheet } from './timesheet';
// import { TIMESHEETS } from './mock-timesheets';

@Injectable()
export class TimesheetDirectService {

  private timesheetsUrl = process.env.API_URL + '/api/v1/timesheets';

  constructor (private http: Http) {
  }
  getTimesheetsListUrl(): string {
    const today = new Date();
    const dayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return this.timesheetsUrl + '?start_date=2016-07-01&end_date=' + dayString;
  }

  getHeaders() {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    return headers;
  }

  // return an Observable to timesheets HTTP request
  getTimesheets(): Observable<Timesheet[]> {
    return this.http.get(this.getTimesheetsListUrl(), { headers: this.getHeaders() })
      .map((response) => this.extractData(response, []))
      .catch(this.handleError);
  }

  // send a POST request with the new timesheets and dispatch the ADD_TIMESHEET action
  // return an observable with the timesheets
  addTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    let options = new RequestOptions({ headers: headers });
    const _ids: string[] = timesheets.map(timesheet => timesheet._id);

    let postRequest = this.http.post(this.timesheetsUrl, {
      data: timesheets.map(this.timesheetToApiMapper)
    }, options)
      .map((response) => this.extractData(response, _ids))
      .catch(this.handleError);

    return postRequest;
  }

  addTimesheet(timesheet: Timesheet): Observable<Timesheet[]> {
    return this.addTimesheets([timesheet]);
  }

  editTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN);
    let options = new RequestOptions({ headers: headers });
    const _ids: string[] = timesheets.map(timesheet => {
      return timesheet._id;
    });

    let putRequest = this.http.put(this.timesheetsUrl, {
      data: timesheets.map(this.timesheetToApiMapper)
    }, options)
      .map((response) => this.extractData(response, _ids))
      .catch(this.handleError);

    return putRequest;
  }
// "2013-08-08T15:00:00-06:00"
  editTimesheet(timesheet: Timesheet): Observable<Timesheet[]> {
    return this.editTimesheets([timesheet]);
  }

  timesheetToApiMapper(timesheet: Timesheet): any {
    let timesheet_copy: any;

    if (timesheet.type === 'regular') {
      timesheet_copy = _.pick(timesheet, ['id', 'start', 'end', 'jobcode_id', 'notes', 'customfields', 'type', 'user_id']);

      if (timesheet_copy.start !== undefined) {
        timesheet_copy.start = moment(timesheet_copy.start).format(DATE_FORMAT_STRING_LONG);
      }

      if (timesheet_copy.end !== undefined) {
        timesheet_copy.end = moment(timesheet_copy.end).format(DATE_FORMAT_STRING_LONG);
      }
    } else {
      timesheet_copy = _.pick(timesheet, ['id', 'date', 'jobcode_id', 'notes', 'customfields', 'duration', 'type', 'user_id']);

      if (timesheet_copy.date !== undefined) {
        timesheet_copy.date = moment(timesheet_copy.date).format(DATE_FORMAT_STRING_SHORT);
      }
    }

    return timesheet_copy;
  }

  /**
   * 
   * 
   * @private
   * @param {Response} res
   * @param {Array<string>} 
   * [_ids=[]] local ids - list of local ids to map response to
   * @returns {Timesheet[]}
   */
  private extractData(res: Response, _ids: Array<string> = []): Timesheet[] {
      let body = res.json();
      let timesheets = Object.keys(body.results.timesheets).map((timesheetId, index) => {
        return body.results.timesheets[timesheetId];
      }).map((timesheet, index) => {
        if (index < _ids.length) {
          timesheet._id = _ids[index];
        }
        timesheet.loading = false;
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
