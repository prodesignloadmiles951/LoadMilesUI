import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CompanyFilters } from '../../model/company-details';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    providers: []
})

export class CompanyComponent implements OnInit {
  public pageFilters: CompanyFilters;
  companyForm: FormGroup;

  constructor(fb: FormBuilder) {
      this.companyForm = fb.group({
          companyname: [''],
          dba: [''],
          mc: [''],
          fedid: [''],
          phone: [''],
          fax: [''],
          email: [''],
          iftalicense: [''],
          usdot: [''],

          address1: [''],
          address2: [''],
          city: [''],
          state: [''],
          zip: [''],

          position: [''],

          address3: [''],
          address4: [''],
          city2: [''],
          state2: [''],
          zip2: [''],
      });
  }

  submit() {
    console.log(this.companyForm.value);
   }

      ngOnInit() {
       }
}



