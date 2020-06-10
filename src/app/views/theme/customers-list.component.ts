import { Component, OnInit} from '@angular/core';
import { CustomersFilters } from '../../model/customers';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    providers: []
})
export class CustomerslistComponent implements OnInit {
    public pageFilters: CustomersFilters;
    Customerslistdata = new Array<CustomersFilters>();
    submitted: boolean;

    constructor(
        private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new CustomersFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/customers');
      }
}
