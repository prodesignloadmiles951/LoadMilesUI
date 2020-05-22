import { TrucksFilters } from './../../model/trucks';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-trucks',
    templateUrl: './trucks.component.html',
    providers: []
})
export class TrucksComponent implements OnInit {
    public pageFilters: TrucksFilters;
    Truckslistdata = new Array<TrucksFilters>();
    submitted: boolean;

    constructor() { }

    ngOnInit() {
        this.pageFilters = new TrucksFilters();
  }


    submit() {
        console.log(this.pageFilters);
}
}
