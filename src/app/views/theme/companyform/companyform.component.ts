import { Component, OnInit, Input } from '@angular/core';
import { CompanyFilters } from '../../../model/companydetails';
import { CompanyService } from '../../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUser } from '../../../model/loginuser';
import { AuthenticationService } from '../../../views/authentication.service';

@Component({
  selector: 'app-companyform',
  templateUrl: './companyform.component.html',
  styleUrls: ['./companyform.component.scss'],
  providers: [CompanyService,ToastrService]
})
export class CompanyformComponent implements OnInit {
	  public pageFilters: CompanyFilters;
    public loginUser: LoginUser;
	  Companylistdata = new Array<CompanyFilters>();
	  submitted: boolean;
	  data: any;
    @Input() datatype;
	  currency
    pageFiltersshow=false;
    mode=false
	  model: any = {};
	  usermanagementdata= [];
    showAddOption=false
    roleArray=[]
    showusertable=false
   

  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private authService: AuthenticationService,
     private router: Router) { }

  ngOnInit() {
    if (this.authService.getloginUser()) {
      this.loginUser = this.authService.getloginUser();
      if (this.loginUser['role']['name'] == 'Admin') {
         this.showusertable = true
      }
    }

  	this.pageFilters = new CompanyFilters();
    this.pageFilters.currency='Select currency'

    // if(this.datatype == undefined){
    //   // this.pageFilters=this.Customerslistdata
    //   this.mode=true
    //   this.showAddOption=true
    // }else{
    //   this.pageFilters=this.datatype
    //   this.mode=this.datatype['EditMode']   
    //   this.showAddOption=false  
    //   this.showAddOption=false     
    // }
    this.pageFiltersshow=true;
    this.getroles()
}

   submit() {
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
      this.submitted = true;
      this.pageFilters['companyid']=localStorage.selectedCompany
      this._companyservice.SendForm(this.pageFilters).subscribe(response => {
        this.submitted = true;
        this._toaster.info("Company Data Submitted","Success", {timeOut: 3000,});
        this.router.navigateByUrl("/theme/company-list");
      },error=>{
        this.submitted=false;
        this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
      });
     }
   }

   getroles(){
      this._companyservice.getRoleData().subscribe(res => {
       console.log(res)
       for (var i = 0; i < res.length; i++) {
         res[i]['ID']=i
       }
       this.roleArray=res
      })
  }

   onAdd(e){
     var addObj=e.data
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
       addObj['company']=localStorage.selectedCompany
       for (var i = 0; i < this.roleArray.length; i++) {
         if(addObj['roleType'] == this.roleArray[i]['ID']){
           addObj['role']=this.roleArray[i]['_id']
           break          
         }
       }
       delete addObj['__KEY__']
       delete addObj['roleType']
       console.log(addObj)
       // this._companyservice.onCreateRole(addObj).subscribe(res => {
       //     console.log(res)
       //    this._toaster.info("Userrole Data Submitted","Success", {timeOut: 3000,});
       //  },error=>{
       //    this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
       //  });       
     }
   }
   onDelete(e){
     console.log(e)
   }
   onEdit(e){
     console.log(e)
   }

}
