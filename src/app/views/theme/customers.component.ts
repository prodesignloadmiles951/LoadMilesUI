import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomersService } from './../../services/customers.service';
import { CustomersFilters } from './../../model/customers';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    providers: [ToastrService, CustomersService]
})
export class CustomersComponent implements OnInit {
    public pageFilters: CustomersFilters;
    Vendorlistdata = new Array<CustomersFilters>();
    submitted: boolean;
    filename: any;
    customerdata= [];

    constructor(private _toaster: ToastrService,
        private _customersservice: CustomersService,
        private router: Router) {
         }

    ngOnInit(): void {
        this.pageFilters = new CustomersFilters();
    }

    showfiles(e){
      console.log(e.target.files)
      this.filename = e.target.files
    }

    submit() {
        if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
                this.submitted = true;
                this.pageFilters['companyId']=localStorage.selectedCompany
                this._customersservice.SendForm(this.pageFilters).subscribe(response => {
                this.submitted = true;
                this._toaster.info("Data Submitted","Success");
                this.router.navigateByUrl("theme/customers-list");
            },error=>{
                this.submitted=false;
                this._toaster.error("Submit Agian","Faild");
            });
         }
    }
}

