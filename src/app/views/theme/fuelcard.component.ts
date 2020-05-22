import { FuelcardFilters } from './../../model/fuelcard';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-fuelcard',
    templateUrl: './fuelcard.component.html',
    providers: []
})
export class FuelcardComponent implements OnInit {
    public pageFilters: FuelcardFilters;
    Fuelcardlistdata = new Array<FuelcardFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new FuelcardFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

