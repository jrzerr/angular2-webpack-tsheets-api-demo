import { UUID } from 'angular2-uuid';

export class Timesheet {
    id: number;
    _id: string;
    user_id: number;
    jobcode_id: number;
    locked: boolean;
    loading: boolean;
    notes: string;
    created: Date;
    last_modified: Date;
    type: string;
    on_the_clock: boolean;
    start: Date;
    end: Date;
    date: Date;
    duration: number;

    isLoading: () => boolean = () => {
        console.log(this.loading);
        return this.loading;
    };

    constructor(ts: any = {
        id: 0,
        _id: '',
        user_id: 0,
        jobcode_id: 0,
        locked: false,
        loading: false,
        notes: '',
        created: '',
        last_modified: '',
        type: 'regular',
        on_the_clock: false,
        start: '',
        end: '',
        date: '',
        duration: 0,
    }) {
        this.id = ts.id;

        if (ts._id === '' || ts._id === undefined) {
            this._id = UUID.UUID();
        } else {
            this._id = ts._id;
        }

        this.user_id = ts.user_id;
        this.jobcode_id = ts.jobcode_id;
        this.locked = ts.locked;
        if (ts.loading === undefined) {
            this.loading = false;
        } else {
            this.loading = ts.loading;
        }
        this.notes = ts.notes;

        if (ts.created) {
            this.created = new Date(ts.created);
        } else {
            this.created = undefined;
        }

        if (ts.last_modified) {
            this.last_modified = new Date(ts.last_modified);
        } else {
            this.last_modified = undefined;
        }

        this.type = ts.type;
        this.on_the_clock = ts.on_the_clock;
        if (ts.start) {
            this.start = new Date(ts.start);
        } else {
            this.start = undefined;
        }
        if (ts.end) {
            this.end = new Date(ts.end);
        } else {
            this.end = undefined;
        }
        if (ts.date) {
            this.date = new Date(ts.date);
        } else {
            this.date = undefined;
        }
        if (ts.duration) {
            this.duration = ts.duration;
        } else {
            this.duration = 0;
        }
    }
}
