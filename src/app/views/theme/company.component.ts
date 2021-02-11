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
  currency
  model: any = {};
  usermanagementdata= [];

  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private router: Router) {
      }

  ngOnInit() {
          this.pageFilters = new CompanyFilters();
          this.pageFilters.currency='Select currency'
          
}


}
