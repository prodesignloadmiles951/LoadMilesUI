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
    companyid=undefined

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
    this.getData()
  }
  Goback() {
    this.router.navigateByUrl('/login');
  }
  getData() {
    this._companyservice.getallCompanyData().subscribe(data => {
      this.pageFilters['companyid'] = 1000+(data.length+1)
    });
  }
  submit() {
      if(this.pageFilters.fedid !== undefined && this.pageFilters ['fedid'].length <= 9){
          this.pageFilters['user']=this.userroledetails
          console.log(this.pageFilters)
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
     var roleObj={}
       for (var i = 0; i < this.roleArray.length; i++) {
         if(addObj['name'] == this.roleArray[i]['ID']){
           roleObj['name']=this.roleArray[i]['name']
           roleObj['_id']=this.roleArray[i]['_id']
           break          
         }
       }
       delete addObj['__KEY__']
       addObj['company']=this.pageFilters.companyid
       addObj['role']=roleObj
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
