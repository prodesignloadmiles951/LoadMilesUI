import { Component, OnInit, Input } from '@angular/core';
import { CompanyFilters } from '../../model/companydetails';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUser } from '../../model/loginuser';
import { AuthenticationService } from '../../views/authentication.service';

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
	  currency
    pageFiltersshow=false;
    mode=false
	  model: any = {};
	  usermanagementdata= [];
    showAddOption=false
    roleArray=[]
    showusertable=false
    userroledetails={}

  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private authService: AuthenticationService,
     private router: Router) { }

  ngOnInit() {
  	

  	this.pageFilters = new CompanyFilters();
    this.pageFilters.currency='Select currency'

    if(this.datatype == undefined){
      // this.pageFilters=this.Customerslistdata
      this.mode=true
      this.showAddOption=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']   
      this.showAddOption=false  
      this.showAddOption=false     
    }
    this.pageFiltersshow=true;
    this.getroles()
  }
  Goback() {
    this.router.navigateByUrl('/login');
  }
  submit() {
      if(this.pageFilters.fedid !== undefined){
          this.pageFilters['user']=this.userroledetails
          console.log(this.pageFilters)
        this._companyservice.newCompanyregister(this.pageFilters).subscribe(response => {
          this._toaster.info("New Company Data Submitted","Success", {timeOut: 3000,});
          this.router.navigateByUrl("/login");
        },error=>{
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
      }else{
          this._toaster.error("Enter TAX ID","Failed", {timeOut: 2000,});
      }
   }

   getroles(){
      this._companyservice.getcompanyRoleData().subscribe(res => {
       console.log(res)
       for (var i = 0; i < res.length; i++) {
         res[i]['ID']=i
       }
       this.roleArray=res
      })
  }

   onAdd(e){
     var addObj=e.data
       for (var i = 0; i < this.roleArray.length; i++) {
         if(addObj['roleType'] == this.roleArray[i]['ID']){
           addObj['role']=this.roleArray[i]['_id']
           break          
         }
       }
       delete addObj['__KEY__']
       delete addObj['roleType']
       addObj['company']=this.pageFilters.companyid
       console.log(addObj)
       this.userroledetails=addObj
 }
   onEdit(e){
     console.log(e)
   }
   onDelete(e){
     console.log(e)
   }
}
