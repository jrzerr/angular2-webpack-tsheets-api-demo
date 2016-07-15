export class Timesheet {
    id: number;
    user_id: number;
    jobcode_id: number;
    locked: boolean;
    notes: string;
    created: string;
    last_modified: string;
    type: string;
    on_the_clock: boolean;
    start: Date;
    end: Date;
    date: Date;
    duration: number;
    
    constructor(ts: any = {
        id: 0,
        user_id: 0,
        jobcode_id: 0,
        locked: false,
        notes: '',
        created: '',
        last_modified: '',
        type: 'regular',
        on_the_clock: false,
        start: undefined,
        end: undefined,
        date: undefined,
        duration: 0,
    }) {
        this.id = ts.id;
        this.user_id = ts.user_id;
        this.jobcode_id = ts.jobcode_id;
        this.locked = ts.locked;
        this.notes = ts.notes;
        this.created = ts.created;
        this.last_modified = ts.last_modified;
        this.type = ts.type;
        this.on_the_clock = ts.on_the_clock;
        this.start = ts.start;
        this.end = ts.end;
        this.date = ts.date;
        this.duration = ts.duration;
    }
}
