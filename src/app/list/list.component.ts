import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public $timesheets: Observable<Timesheet[]>;
  public errorMessage: any;
  public selectedId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService) {
    // Do stuff
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

    this.$timesheets = this.timesheetService.getTimesheets();
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
