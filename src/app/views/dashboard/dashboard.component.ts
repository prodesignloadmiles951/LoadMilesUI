import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'dashboard.component.html',
  providers: [ToastrService, CompanyService]
})
export class DashboardComponent implements OnInit {
  data: any;

//  userData: any = [
//    {slno: '1', companyname: 'Company', fedid: 'abc123', usdot: 'abc', mc: 'abc', phone: '0123456789', email: 'test@gmail.com'},
//    {slno: '2', companyname: 'Company', fedid: 'abc123', usdot: 'abc', mc: 'abc', phone: '0123456789', email: 'test@gmail.com'},
//    {slno: '3', companyname: 'Company', fedid: 'abc123', usdot: 'abc', mc: 'abc', phone: '0123456789', email: 'test@gmail.com'},
//  ];


 constructor(
  private router: Router,
  private _companyservice: CompanyService,
  private _toaster: ToastrService,
 ) {
   //console.log(this.userData);
 }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._companyservice.getCompanyData().subscribe(data => {
      this.data = data;
    });
  }

  deleteCompany(_id: number){
    this._companyservice.DeleteCompany(_id).subscribe(data => {
    this._toaster.info("Company Data Delete", "Success");
    this.getData();
   });
   }

  Add() {
    this.router.navigateByUrl('/theme/company');
  }
}
