import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { LoginUser } from '../../model/loginuser';
import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'dashboard.component.html',
  providers: [DashboardService, ToastrService]
})
export class DashboardComponent implements OnInit {

 userData: any = [
   {slno: '1', companyname: 'Company', fedid: 'abc123', usdot: 'abc', mc: 'abc', phone: '0123456789', email: 'test@gmail.com'},
   {slno: '2', companyname: 'Company', fedid: 'abc123', usdot: 'abc', mc: 'abc', phone: '0123456789', email: 'test@gmail.com'},
   {slno: '3', companyname: 'Company', fedid: 'abc123', usdot: 'abc', mc: 'abc', phone: '0123456789', email: 'test@gmail.com'},
 ];


 constructor(
  private router: Router,
 ) {
   console.log(this.userData);
 }
  ngOnInit(): void {
  }

  Add() {
    this.router.navigateByUrl('/theme/company');
  }
}
