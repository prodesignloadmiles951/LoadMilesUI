import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CompanyFilters } from '../../model/companydetails';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    providers: []
}) 

export class CompanyComponent implements OnInit {
  public pageFilters: CompanyFilters;
  companyForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.companyForm = this.formBuilder.group({
            companyName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern]],
            fedid: ['', Validators.required],
            usdot: ['', Validators.required],
            mc: ['', Validators.required],
            dba: [''],
            iftalicense: [''],
            fax: [''],
            address1: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            file: [''],
            position: [''],
            address3: [''],
            address4: [''],
            city2: [''],
            state2: [''],
            zip2: [''],
          });
}
        get f() { return this.companyForm.controls; }

  submit() {
    this.submitted = true;
    if (this.companyForm.invalid) {
        return;
    }
    //alert('success');
    console.log(this.companyForm.value);
   }
}
