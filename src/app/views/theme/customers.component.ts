import { CustomersFilters } from './../../model/customers';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    providers: []
})
export class CustomersComponent implements OnInit {
    public pageFilters: CustomersFilters;
    Vendorlistdata = new Array<CustomersFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new CustomersFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

