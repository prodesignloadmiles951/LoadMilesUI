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
          website: [''],
          iftalicense: [''],
          usdot: [''],

          bill: [''],
          attention: [''],
          street1: [''],
          street2: [''],
          city: [''],
          state: [''],
          zip: [''],

          position: [''],

          attention1: [''],
          street3: [''],
          street4: [''],
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



