import { FuelcardFilters } from './../../model/fuelcard';
import { Component, OnInit, Inject} from '@angular/core';
import { FuelcardService } from '../../services/fuelcard.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-fuelcard',
    templateUrl: './fuelcard.component.html',
    providers: [FuelcardService]
})
export class FuelcardComponent implements OnInit {
    public pageFilters: FuelcardFilters;
    Fuelcardlistdata = new Array<FuelcardFilters>();
    submitted: boolean;
    fuelcarddata: [];
    router: any;

    constructor(private _toaster: ToastrService,
        public dialogRef: MatDialogRef< FuelcardComponent >,
      @Inject(MAT_DIALOG_DATA) public retreivedData: any,
        private _fuelcardService: FuelcardService) {
        }

    ngOnInit(): void {
        if (this.retreivedData) {
            console.log(this.retreivedData, "retreived data");
            this.pageFilters = this.retreivedData;
        } else {
            this.pageFilters = new FuelcardFilters();
        }
        this.getData();

    }

    submit() {
        console.log(this.pageFilters);
        this._fuelcardService.SendForm(this.pageFilters).subscribe(response => {
            this.submitted = true;
            this._toaster.info("Fuel card Data Submitted","Success");
            this.router.navigateByUrl("theme/fuelcard-list");
          },error=>{
            this.submitted=false;
            this._toaster.error("Submit Again","Failed");
          });
          this.getData();
       }
    getData() {
        this._fuelcardService.getFuelcardData().subscribe(data => {
          this.fuelcarddata = data;
        });
    }
}

