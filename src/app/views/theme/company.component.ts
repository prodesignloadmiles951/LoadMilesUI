import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CompanyFilters } from '../../model/companydetails';
import { AuthHeaderService } from '../authheader.service';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    providers: [CompanyService,ToastrService,AuthHeaderService]
})

export class CompanyComponent implements OnInit {
  public pageFilters: CompanyFilters;
  companyForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder,
     private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private authHeader: AuthHeaderService,
     private router: Router) {
       this.pageFilters = new CompanyFilters();
      }

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
    } else{
    this._companyservice.SendForm(this.companyForm.value).subscribe(data => {
      this.submitted = true;
      this._toaster.info("Data Submitted","Success");
      this.router.navigateByUrl("dashboard");
    },error=>{
      this.submitted=false;
      this._toaster.error("Submit Agian","Faild");
    });
    }
    //alert('success');
    console.log(this.companyForm.value);
   }
}
