import { CustomersFilters } from './../../model/customers';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerformComponent } from './customerform/customerform.component'

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
    Isusersloading: boolean;
    SearchText: any;
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
        private router: Router, public dialog: MatDialog) { }

    ngOnInit() {
        this.Isusersloading = false;
        this.getData();
    }

    viewData(customer) {
        var customerObj=customer
        customerObj['EditMode']=false
        let dialogConfig = Object.assign({ width: "1100px" },{ data: customerObj })
        let viewDialogRef = this.dialog.open(CustomerformComponent, dialogConfig);
        viewDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
        })
      }
      getData() {
        this._customersservice.getCustomersData().subscribe(data => {
          if(data.paymentterms != undefined){
          for (var i = 0; i < data.length; i++) {
            this.paymentterms.map(item => {
              if(item.type == data[i]['paymentterms'][0]){
                data[i]['paymentterms']=item.name
              }
            })            
          }
        }
          this.data = data.result;
        });
      }

      editData(customer) {
        var customerObj=customer
        customerObj['EditMode']=true
        let dialogConfig = Object.assign({ width: "1100px" },{ data: customerObj })
        let editDialogRef = this.dialog.open(CustomerformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
        })
      }

      hidePopup(){
      this.showForm=false
    }
    onCustomerSearch(e){
      console.log(e)
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

    Add() {
        let dialogConfig = Object.assign({ width: "1100px" },{ data: {} })
        let editDialogRef = this.dialog.open(CustomerformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
        })
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
