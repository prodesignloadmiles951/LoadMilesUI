import { Component, OnInit, Input } from '@angular/core';
import { CompanyFilters } from '../../../model/companydetails';
import { CompanyService } from '../../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companyform',
  templateUrl: './companyform.component.html',
  styleUrls: ['./companyform.component.scss'],
  providers: [CompanyService,ToastrService]
})
export class CompanyformComponent implements OnInit {
	  public pageFilters: CompanyFilters;
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
    roleArray=[
       {
            "ID": 0,
            "Name": "Admin"
        },
        {
            "ID": 1,
            "Name": "Dispatcher"
        },
        {
            "ID": 2,
            "Name": "Driver"
        }
    ]

  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private router: Router) { }

  ngOnInit() {
  	this.pageFilters = new CompanyFilters();
    this.pageFilters.currency='Select currency'

    console.log(this.datatype)
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
   onAdd(e){
     var addObj=e.data
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
       for (var i = 0; i < this.roleArray.length; i++) {
         if(addObj.type == this.roleArray[i]['ID']){
           addObj['role']=this.roleArray[i]['Name']
           break
         }
       }
       addObj['companyid']=localStorage.selectedCompany
       delete addObj['type']
       delete addObj['__KEY__']
       console.log(addObj)
       this._companyservice.onCreateRole(addObj).subscribe(res => {
           console.log(res)
          this._toaster.info("Userrole Data Submitted","Success", {timeOut: 3000,});
        },error=>{
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });       
     }
   }
   onDelete(e){
     console.log(e)
   }
   onEdit(e){
     console.log(e)
   }

}
