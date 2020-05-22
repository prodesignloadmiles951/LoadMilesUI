import { CarrierFilters } from '../../model/carrier';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-carrier',
    templateUrl: './carrier.component.html',
    providers: []
})
export class CarrierComponent implements OnInit {
    public pageFilters: CarrierFilters;
    Carrierlistdata = new Array<CarrierFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new CarrierFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

