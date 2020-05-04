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
   {slno: '1', companyname: 'abc', companydetails: 'abc', username: 'abc'},
   {slno: '2', companyname: 'abc', companydetails: 'abc', username: 'abc'},
   {slno: '3', companyname: 'abc', companydetails: 'abc', username: 'abc'},
   {slno: '4', companyname: 'abc', companydetails: 'abc', username: 'abc'},
   {slno: '5', companyname: 'abc', companydetails: 'abc', username: 'abc'},
   {slno: '6', companyname: 'abc', companydetails: 'abc', username: 'abc'}
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
