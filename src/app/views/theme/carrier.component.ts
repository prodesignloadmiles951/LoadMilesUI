import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarrierService } from './../../services/carrier.service';
import { CarrierFilters } from '../../model/carrier';
import { Component, OnInit} from '@angular/core';



@Component({
    selector: 'app-carrier',
    templateUrl: './carrier.component.html',
    providers: [ToastrService, CarrierService]
})
export class CarrierComponent implements OnInit {
    public pageFilters: CarrierFilters;
    Carrierlistdata = new Array<CarrierFilters>();
    submitted: boolean;

    constructor(private _toaster: ToastrService,
        private _carrierservice: CarrierService,
        private router: Router ){

        }
    ngOnInit(): void {
        this.pageFilters = new CarrierFilters();
    }

    submit() {
        this.submitted = true;
        this._carrierservice.SendForm(this.pageFilters).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Data Submitted","Success");
          this.router.navigateByUrl("theme/carrier-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Agian","Faild");
        });
        // console.log(this.pageFilters);
       }
}

 