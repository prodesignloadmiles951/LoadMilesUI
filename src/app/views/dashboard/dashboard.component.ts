import { CompanyFilters } from './../../model/companydetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'dashboard.component.html',
  providers: [ToastrService, CompanyService]
})
export class DashboardComponent implements OnInit {
  public company: CompanyFilters;
  // public EditMode: boolean = false;
  data: any;
  pageFilters: CompanyFilters;
  selectedCompany: any;
  EditMode: boolean;
 


 constructor(
  private router: Router,
  private _companyservice: CompanyService,
  private _toaster: ToastrService,
 ) {
  this.pageFilters = new CompanyFilters();
   //console.log(this.userData);
 }
  ngOnInit(): void {
    //this.getData();
  }
  viewData(cmp) {
    this.EditMode = false;
    this.company = new CompanyFilters();
    this.company = cmp;
    this.selectedCompany = cmp.companyname;

  }

   loadDetails: any = [
   {loadno: '1020102', Customer: 'AXP Logistics', CustomerLoad: 'D121412', contact: '222-333-444', email: 'kack@Axpl.com', Dispatcher: 'DXC Logistics', Driver: 'Dan Grisby', Driverno:'222-589-789', Truck:'FLR12334', LoadStatus: 'Loaded-ontime', PickupLocation:'Florida', DropOffLocation:'NYC', Comments:''},
   {loadno: '1020103', Customer: 'DXC Logistics', CustomerLoad: 'D131412', contact: '222-666-444', email: 'jack@Axpl.com', Dispatcher: 'XMC Logistics', Driver: 'Dan Smith', Driverno:'222-589-789', Truck:'FLR56984', LoadStatus: 'Loaded-delay', PickupLocation:'NYC', DropOffLocation:'Georgia', Comments:''},
   {loadno: '1020104', Customer: 'XYZ Logistics', CustomerLoad: 'D121342', contact: '222-333-777', email: 'xyz@Axpl.com', Dispatcher: 'YBK Logistics', Driver: 'Dan Fernandes', Driverno:'222-589-789', Truck:'FLR78514', LoadStatus: 'Arrival-ontime', PickupLocation:'Georgia', DropOffLocation:'Florida', Comments:''},
   {loadno: '1020105', Customer: 'MYK Logistics', CustomerLoad: 'D455612', contact: '111-333-444', email: 'mycs@Axpl.com', Dispatcher: 'MUD Logistics', Driver: 'George Smith', Driverno:'222-589-789', Truck:'RFD589632', LoadStatus: 'Arrival-delay', PickupLocation:'San Fransisco', DropOffLocation:'NYC', Comments:''}
 ];
  // getData() {
  //   this._companyservice.getCompanyData().subscribe(data => {
  //     this.data = data;
  //   });
  // }

  // editCompany(cmp) {
  //   this._companyservice.EditCompany(cmp._id).subscribe(response => {
  //     this._toaster.success("company successfull updated", "Success");
  //   }, error => {
  //      this._toaster.error("error", "Try Again");
  //     });
  // }

  // deleteCompany(cmp) {
  //   this._companyservice.DeleteCompany(cmp._id).subscribe(data => {
  //   this._toaster.info("Company Data Delete", "Success");
  //   this.getData();
  //  });
  //  }

  // Add() {
  //   this.router.navigateByUrl('/theme/company');
  // }
}
