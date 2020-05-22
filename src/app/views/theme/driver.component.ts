import { Component, OnInit} from '@angular/core';
import { DriverFilters } from '../../model/driver';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    providers: []
})
export class DriverComponent implements OnInit {
    public pageFilters: DriverFilters;
    Driverlistdata = new Array<DriverFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new DriverFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}
