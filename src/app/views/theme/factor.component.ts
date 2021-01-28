import { FactorService } from './../../services/factor.service';
import { FactorFilters } from './../../model/factor';
import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-factor',
    templateUrl: './factor.component.html',
    providers: [FactorService]
})
export class FactorComponent implements OnInit {
    public pageFilters: FactorFilters;
    Factorlistdata = new Array<FactorFilters>();
    submitted: boolean;
    router: any;
    factordata: [];


    constructor(private _toaster: ToastrService,
        public dialogRef: MatDialogRef< FactorComponent >,
      @Inject(MAT_DIALOG_DATA) public retreivedData: any,
        private _factorService: FactorService) {
        }

    ngOnInit(): void {
        if (this.retreivedData) {
            console.log(this.retreivedData, "retreived data");
            this.pageFilters = this.retreivedData;
        } else {
            this.pageFilters = new FactorFilters();
        }
        this.getData();

    }

    submit() {
        console.log(this.pageFilters);
        this._factorService.SendForm(this.pageFilters).subscribe(response => {
            this.submitted = true;
            this._toaster.info("Factor Data Submitted","Success");
            this.router.navigateByUrl("theme/factor-list");
          },error=>{
            this.submitted=false;
            this._toaster.error("Submit Again","Failed");
          });
          this.getData();
       }
    getData() {
        this._factorService.getFactorData().subscribe(data => {
          this.factordata = data;
        });
    }
}

