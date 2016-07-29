import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TimesheetService, Timesheet } from '../shared';
import { TimesheetComponent } from  '../timesheet';

@Component({
  selector: 'ts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [TimesheetService],
  directives: [TimesheetComponent],
})
export class ListComponent implements OnInit, OnDestroy {

  private paramsSub: Subscription;
  private $editTimesheets: Observable<Timesheet[]>;
  private editSub: Subscription;
  public $timesheets: Observable<Timesheet[]>;
  public timesheets: Timesheet[];
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
    console.log('Hello List');
    this.paramsSub = this.router.routerState.queryParams.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.selectedId = +params['id'];
      }
    });

    this.route.params.subscribe(params => {
      console.log(params);
    });

    this.$timesheets = this.timesheetService.getTimesheets()
      .map(timesheets => {
        return timesheets.sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        });
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  onSaveTimesheet(timesheet : Timesheet) {
    this.$editTimesheets = this.timesheetService.editTimesheet(timesheet)
      .map(timesheets => {
        console.log(timesheets);
        return timesheets;
      });
    
    this.editSub = this.$editTimesheets.subscribe();
  }
}
