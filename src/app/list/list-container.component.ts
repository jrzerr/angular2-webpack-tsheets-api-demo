import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TimesheetService, Timesheet } from '../shared';
import { ListComponent } from  './list.component';

@Component({
  selector: 'ts-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [TimesheetService],
  directives: [ListComponent]
})
export class ListContainerComponent implements OnInit, OnDestroy {

  private paramsSub: Subscription;
  public timesheets: Timesheet[];
  public $timesheets: Observable<Timesheet[]>;
  public errorMessage: any;
  public selectedId: number;
  public TIMESHEET_ID_PREFIX: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService,
    private elementRef: ElementRef) {
    // Do stuff
    this.TIMESHEET_ID_PREFIX = 'timesheet-view';
  }

  selectTimesheet(id: number) {
    this.router.navigate(['list'], { queryParams: { id }});
  }

  ngOnInit() {
    this.paramsSub = this.router.routerState.queryParams.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.selectedId = +params['id'];
      }
    });

    this.route.params.subscribe(params => {
      // console.log(params);
    });
    this.timesheetService.timesheets
      .map(timesheets => {
        return timesheets.sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        });
      })
      .subscribe(timesheets => {
        this.timesheets = [...timesheets];
      });
    // this should probably be done elsewhere in the app
    this.timesheetService.getTimesheets();
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  saveTimesheet(timesheet: Timesheet) {
    this.timesheetService.editTimesheet(timesheet);
  }

  trackById(index: number, timesheet: Timesheet) {
    return timesheet._id;
  }
}
