export class Timesheet {
    id: number;
    user_id: number;
    jobcode_id: number;
    locked: boolean;
    notes: number;
    created: string;
    last_modified: string;
    type: string;
    on_the_clock: boolean;
    start: string;
    end: string;
    date: string;
    duration: number;
}
