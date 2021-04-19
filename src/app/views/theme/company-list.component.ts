import { CompanyFilters } from './../../model/companydetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { AuthenticationService } from '../../views/authentication.service';
import { LoginUser } from '../../model/loginuser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompanyformComponent } from './companyform/companyform.component'



@Component({
  templateUrl: 'company-list.component.html',
  providers: [ToastrService, CompanyService]
})
export class CompanylistComponent implements OnInit {
  public company: CompanyFilters;
  // public EditMode: boolean = false;
  public loginUser: LoginUser;
  data: any;
  pageFilters: CompanyFilters;
  selectedCompany: any;
  EditMode: boolean;
  Isusersloading: boolean;
  SearchText: any;
  showusertable=false
  userid={}


 constructor(
  private router: Router,
  private _companyservice: CompanyService,
  private authService: AuthenticationService,
  public dialog: MatDialog,
  private _toaster: ToastrService,
 ) {
  this.pageFilters = new CompanyFilters();
 }
  ngOnInit(): void {
    this.Isusersloading = false;
    if (this.authService.getloginUser()) {
      this.loginUser = this.authService.getloginUser();
      this.getData();
      if (this.loginUser['role']['name'] == 'Admin') {
         this.showusertable = true
      }
    }
  }
  viewData(cmp) {
        var companyObj=cmp
        companyObj['EditMode']=false
        let dialogConfig = Object.assign({ width: "1000px" },{ data: companyObj })
        let viewDialogRef = this.dialog.open(CompanyformComponent, dialogConfig);
        viewDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
        })
  }
  editData(cmp) {
    var companyObj=cmp
        companyObj['EditMode']=true
        let dialogConfig = Object.assign({ width: "1000px" },{ data: companyObj })
        let editDialogRef = this.dialog.open(CompanyformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
        })
  }

  getData() {
    this.userid= this.loginUser['_id']
    this._companyservice.getcompanylistinfo(this.userid).subscribe(data => {
      this.data = data;
    });
  }

  Add() {
    let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(CompanyformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
        })
  }
}
