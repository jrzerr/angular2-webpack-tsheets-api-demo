import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
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
  animations: [
    trigger('timesheetState', [
      // state('selected', style({
      //   borderColor: '#ff0'
      // })),
      // state('notselected', style({
      //   borderColor: '#fff'
      // })),
      // transition('notselected => selected', animate('500ms ease-in')),
      // transition('selected => notselected', animate('500ms ease-out')),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('500ms ease-in', style({ opacity: '1' }))
        ]),
    ])
  ]
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
