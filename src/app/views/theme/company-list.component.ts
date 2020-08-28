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


 constructor(
  private router: Router,
  private _companyservice: CompanyService,
  private _toaster: ToastrService,
 ) {
  this.pageFilters = new CompanyFilters();
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
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
        cmp['companyid']=localStorage.selectedCompany
        this._companyservice.EditCompany(cmp).subscribe(response => {
          this._toaster.success("company successfully updated", "Success", {timeOut: 3000,});
        }, error => {
           this._toaster.error("error", "Try Again", {timeOut: 2000,});
          });
          this.EditMode = false;
       }
  }

  deleteCompany(cmp) {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this._companyservice.DeleteCompany(cmp._id).subscribe(data => {
        this._toaster.info("Company Data Delete", "Success", {timeOut: 3000,});
        this.getData();
       });
     }
   }

  Add() {
    this.router.navigateByUrl('/theme/company');
  }
}
