import { Component, OnInit} from '@angular/core';
import { CarrierFilters } from '../../model/carrier';
import { Router } from '@angular/router';

@Component({
    selector: 'app-carrier-list',
    templateUrl: './carrier-list.component.html',
    providers: []
})
export class CarrierlistComponent implements OnInit {
    public pageFilters: CarrierFilters;
    Driverlistdata = new Array<CarrierFilters>();
    submitted: boolean;

    constructor(
        private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new CarrierFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/carrier');
      }
}
