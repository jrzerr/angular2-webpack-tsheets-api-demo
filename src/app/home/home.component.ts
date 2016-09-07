import { Component, OnInit } from '@angular/core';
import { TimesheetService, Timesheet } from '../shared';

@Component({
  selector: 'my-home',
  providers: [TimesheetService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    timesheets: Timesheet[];
    errorMessage: any;

  constructor(private timesheetService: TimesheetService) {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
