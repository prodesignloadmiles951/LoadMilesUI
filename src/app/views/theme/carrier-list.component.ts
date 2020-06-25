import { CompanyFilters } from './../../model/company-details';
import { CarrierService } from './../../services/carrier.service';
import { Component, OnInit} from '@angular/core';
import { CarrierFilters } from '../../model/carrier';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-carrier-list',
    templateUrl: './carrier-list.component.html',
    providers: [ToastrService, CarrierService]
})
export class CarrierlistComponent implements OnInit {
    public company: CompanyFilters;
    public carriers: CarrierFilters;
    pageFilters: CarrierFilters;
    Carrierlistdata = new Array<CarrierFilters>();
    submitted: boolean;
    data: any;
    selectedCarrier: any;
    selectedCompany: any;
    EditMode: boolean;

    constructor(private _toaster: ToastrService,
        private _carrierservice: CarrierService,
        private router: Router) { }

        ngOnInit() {
            this.getData();
        }
viewData(carrier) {
    this.EditMode = false;
    this.carriers = new CarrierFilters();
    this.carriers = carrier;
    this.selectedCarrier = carrier.plate;
}
    getData() {
    this._carrierservice.getCarrierData().subscribe(data => {
        this.data = data;
    });
    }

editData(carrier) {
    this.EditMode = true;
    this.carriers = new CarrierFilters();
    this.carriers = carrier;
    this.selectedCarrier = carrier.companyname;
    }
    editTrucks(carrier) {
        this._carrierservice.EditCarrier(carrier).subscribe(response => {
            this._toaster.success("Carrier successfully updated", "Success");
        }, error => {
            this._toaster.error("error", "Try Again");
            });
            this.EditMode = false;
        }

    // submit() {
    //     console.log(this.pageFilters);
    // }
    Add() {
        this.router.navigateByUrl('/theme/carrier');
      }
deleteTrucks(carrier) {
    this._carrierservice.DeleteCarrier(carrier._id).subscribe(data => {
    this._toaster.info("Carrier Data Delete", "Success");
    this.getData();
    });
    }
}
 