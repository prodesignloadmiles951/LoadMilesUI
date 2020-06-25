import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { CompanyFilters } from '../../model/companydetails';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    providers: [CompanyService,ToastrService]
})

export class CompanyComponent implements OnInit {
  public pageFilters: CompanyFilters;
  Companylistdata = new Array<CompanyFilters>();
  submitted: boolean;
  data: any;
  model: any = {};

  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private router: Router) {
      }

  ngOnInit() {
          this.pageFilters = new CompanyFilters();
}

  submit() {
    this.submitted = true;
    this._companyservice.SendForm(this.pageFilters).subscribe(response => {
      this.submitted = true;
      this._toaster.info("Data Submitted","Success");
      this.router.navigateByUrl("/theme/company-list");
    },error=>{
      this.submitted=false;
      this._toaster.error("Submit Agian","Faild");
    });
    // console.log(this.pageFilters);
   }


  //  editCompany() {
  //   this._companyservice.EditCompany(this.pageFilters).subscribe(response => {
  //     this._toaster.success("Company Details updated", "Success");
  //   }, error => {this._toaster.error(error, "Error"); });
  // } 

}
