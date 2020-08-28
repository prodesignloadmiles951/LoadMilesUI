import { Component, OnInit, Input } from '@angular/core';
import { CustomersService } from './../../../services/customers.service';
import { CustomersFilters } from './../../../model/customers';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss'],
  providers: [CustomersService]
})
export class CustomerformComponent implements OnInit {
	public pageFilters={};
    public customers: CustomersFilters;
    Customerslistdata = new Array<CustomersFilters>();
    customerdata=[];
    @Input() datatype;
    mode=false
    finalArry=[]
    pageFiltersshow=false;
    submitted: boolean;
    contactinfodata={};
    showAddOption=false

  constructor(private _customersservice: CustomersService, private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {
    console.log(this.datatype)
    if(this.datatype == undefined){
      // this.pageFilters=this.Customerslistdata
      this.mode=true
      this.showAddOption=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']   
      this.customerdata.push(this.datatype.contactinfodata)
      this.showAddOption=false  
      this.showAddOption=false     
    }
    this.pageFiltersshow=true;
  }

  addfiles(e){
      var finalArry=e.target.files
      if(finalArry.length > 0){
        for (var i = 0; i < finalArry.length; i++) {
          this.finalArry.push(finalArry[i].name)
        }
        sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
        this.finalArry=JSON.parse(sessionStorage.file_upload)
      }
  }

  onAdd(eventName) {
    console.log(eventName.key) 
    this.contactinfodata = eventName.key
  }

  onDelete(eventName) {
    console.log(eventName.key)
    this._customersservice.DeleteCustomers(eventName.key).subscribe(data => {
      console.log(data)
    });
  }

   submit() {
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Customerslistdata:any=this.pageFilters
        Customerslistdata['contactinfodata']=this.contactinfodata
        Customerslistdata['companyid']=localStorage.selectedCompany
        this._customersservice.SendForm(Customerslistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Customerform Data Submitted","Success", {timeOut: 3000,});
         this.router.navigateByUrl("theme/customers-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
        console.log(this.pageFilters);
       }
     }

}
