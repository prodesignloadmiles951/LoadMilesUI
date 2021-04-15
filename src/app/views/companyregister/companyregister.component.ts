import { Component, OnInit, Input } from '@angular/core';
import { CompanyFilters } from '../../model/companydetails';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUser } from '../../model/loginuser';
import { AuthenticationService } from '../../views/authentication.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-companyregister',
  templateUrl: './companyregister.component.html',
  styleUrls: ['./companyregister.component.scss'],
  providers: [CompanyService,ToastrService]
})
export class CompanyregisterComponent implements OnInit {
	public pageFilters: CompanyFilters;
    public loginUser: LoginUser;
	Companylistdata = new Array<CompanyFilters>();
	data: any;
    @Input() datatype;
    pageFiltersshow=false;
    mode=false
	  model: any = {};
	  usermanagementdata= [];
    showAddOption=false
    roleArray=[]
    showusertable=false
    userroledetails=[]
    account
    location
    companyid=undefined
    captcha:any

  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private authService: AuthenticationService,
     private router: Router) { }

  ngOnInit() {

  	this.pageFilters = new CompanyFilters();
    this.pageFilters.account = {
      currency : 'Select currency',
    };
    // this.pageFilters.account = {
    //   acctype : 'Select account type',
    // };
    this.pageFilters.location = {};
    if(this.datatype == undefined){
      this.mode=true
      this.showAddOption=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']   
      this.showAddOption=false  
      this.showAddOption=false     
    }
    this.pageFiltersshow=true;
  }
  Goback() {
    this.router.navigateByUrl('/login');
  }
  
  submit() {
      if(this.pageFilters.fedid !== undefined && this.pageFilters ['fedid'].length <= 9){
            this.pageFilters['captchatoken'] = this.captcha
            this._companyservice.newCompanyregister(this.pageFilters).subscribe(response => {
              console.log(response)
              if(response.Status != "error"){
                this._toaster.info(response.message,"Success", {timeOut: 3000,});
                this.router.navigateByUrl("/login");
              }else{
                this._toaster.error(response.error,"Failed", {timeOut: 2000,});
              }
            },error=>{
              this._toaster.error(error.error,"Failed", {timeOut: 2000,});
            });
      } else{
          this._toaster.error("Enter TAX ID","Failed", {timeOut: 2000,});
      }
   }


 resolved(captchaResponse: string, res) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.captcha = captchaResponse
  }
   
}
