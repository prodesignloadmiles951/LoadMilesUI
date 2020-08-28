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
    customerData={}
    showForm=false
    paymentterms=[
      {'type':0,'name':'QuickPay'},
      {'type':1,'name':'15 days'},
      {'type':2,'name':'35 days'},
      {'type':3,'name':'45 days'}
    ]

    constructor(private _customersservice: CustomersService,
        private _toasterservice: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.getData();
    }

    viewData(customer) {
        this.EditMode = false;
        var customerObj=customer
        customerObj['EditMode']=this.EditMode
        this.customerData=customerObj
        this.customers = new CustomersFilters();
        this.customers = customer;
        this.selectedCustomer = customer.companyname;
        this.showForm=true
      }
      getData() {
        this._customersservice.getCustomersData().subscribe(data => {
          for (var i = 0; i < data.length; i++) {
            this.paymentterms.map(item => {
              if(item.type == data[i]['paymentterms'][0]){
                data[i]['paymentterms']=item.name
              }
            })            
          }
          this.data = data;
        });
      }

      editData(customer) {
        this.EditMode = true;
        var customerObj=customer
        customerObj['EditMode']=this.EditMode
        this.customerData=customerObj
        this.customers = new CustomersFilters();
        this.customers = customer;
        this.selectedCustomer = customer.companyname;
        this.showForm=true
      }

      hidePopup(){
      this.showForm=false
    }

      editCustomer(customer,selectedCustomer) {
        if(localStorage.selectedCompany == undefined){
           this._toasterservice.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
          customer['companyid']=localStorage.selectedCompany
          this._customersservice.EditCustomers(customer).subscribe(response => {
            this._toasterservice.success(selectedCustomer+ " customer successfully updated", "Success", {timeOut: 3000,});
          }, error => {
             this._toasterservice.error("error", "Try Again", {timeOut: 2000,});
            });
            this.EditMode = false;
           }
      }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/customers');
      }
    deleteCustomer(customer) {
      if(localStorage.selectedCompany == undefined){
         this._toasterservice.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
          this._customersservice.DeleteCustomers(customer._id).subscribe(data => {
          this._toasterservice.info("Customer Data Delete", "Success", {timeOut: 3000,});
          this.getData();
         });
       }
     }
}
