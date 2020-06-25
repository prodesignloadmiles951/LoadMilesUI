import { CustomersFilters } from './../../model/customers';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    providers: [ToastrService, CustomersService]
})
export class CustomerslistComponent implements OnInit {
    public pageFilters: CustomersFilters;
    public customers: CustomersFilters;
    Customerslistdata = new Array<CustomersFilters>();
    submitted: boolean;
    data: any;
    selectedCustomer: any;
    selectedCompany: any;
    EditMode: boolean;

    constructor(private _customersservice: CustomersService,
        private _toasterservice: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.getData();
    }

    viewData(customer) {
        this.EditMode = false;
        this.customers = new CustomersFilters();
        this.customers = customer;
        this.selectedCustomer = customer.companyname;
      }
      getData() {
        this._customersservice.getCustomersData().subscribe(data => {
          this.data = data;
        });
      }

      editData(customer) {
        this.EditMode = true;
        this.customers = new CustomersFilters();
        this.customers = customer;
        this.selectedCustomer = customer.companyname;

      }

      editCustomer(customer) {
        this._customersservice.EditCustomers(customer).subscribe(response => {
          this._toasterservice.success("Customer successfully updated", "Success");
        }, error => {
           this._toasterservice.error("error", "Try Again");
          });
          this.EditMode = false;
      }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/customers');
      }
      deleteCustomer(customer) {
        this._customersservice.DeleteCustomers(customer._id).subscribe(data => {
        this._toasterservice.info("Customer Data Delete", "Success");
        this.getData();
       });
       }
}
