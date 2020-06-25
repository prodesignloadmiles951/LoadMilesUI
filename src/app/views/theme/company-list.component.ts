import { CompanyFilters } from './../../model/companydetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'company-list.component.html',
  providers: [ToastrService, CompanyService]
})
export class CompanylistComponent implements OnInit {
  public company: CompanyFilters;
  // public EditMode: boolean = false;
  data: any;
  pageFilters: CompanyFilters;
  selectedCompany: any;
  EditMode: boolean;
 
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
  this.pageFilters = new CompanyFilters();
   //console.log(this.userData);
 }
  ngOnInit(): void {
    this.getData();
  }
  viewData(cmp) {
    this.EditMode = false;
    this.company = new CompanyFilters();
    this.company = cmp;
    this.selectedCompany = cmp.companyname;

  }
  editData(cmp) {
    this.EditMode = true;
    this.company = new CompanyFilters();
    this.company = cmp;
    this.selectedCompany = cmp.companyname;

  }

  getData() {
    this._companyservice.getCompanyData().subscribe(data => {
      this.data = data;
    });
  }

  editCompany(cmp) {
    this._companyservice.EditCompany(cmp).subscribe(response => {
      this._toaster.success("company successfully updated", "Success");
    }, error => {
       this._toaster.error("error", "Try Again");
      });
      this.EditMode = false;
  }

  deleteCompany(cmp) {
    this._companyservice.DeleteCompany(cmp._id).subscribe(data => {
    this._toaster.info("Company Data Delete", "Success");
    this.getData();
   });
   }

  Add() {
    this.router.navigateByUrl('/theme/company');
  }
}
