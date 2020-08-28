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
    EditMode=false;
    carrierData={}
    showForm=false

    constructor(private _toaster: ToastrService,
        private _carrierservice: CarrierService,
        private router: Router) { }

        ngOnInit() {
            this.getData();
        }
    viewData(carrier) {
        this.EditMode = false;
        var carrierObj=carrier
        carrierObj['EditMode']=this.EditMode
        this.carrierData=carrierObj
        this.carriers = new CarrierFilters();
        this.carriers = carrier;
        this.selectedCarrier = carrier.companyname;
        this.showForm=true
    }
    getData() {
    this._carrierservice.getCarrierData().subscribe(data => {
        this.data = data;
    });
    }

    editData(carrier) {
        this.EditMode = true;
        var carrierObj=carrier
        carrierObj['EditMode']=this.EditMode
        this.carrierData=carrierObj
        this.carriers = new CarrierFilters();
        this.carriers = carrier;
        this.selectedCarrier = carrier.companyname;
        this.showForm=true
    }

    hidePopup(){
          this.showForm=false
        }

    editCarriers(carrier,selectedCarrier) {
        if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
            carrier['companyid']=localStorage.selectedCompany
            this._carrierservice.EditCarrier(carrier).subscribe(response => {
                this._toaster.success(selectedCarrier+ " carrier successfully updated", "Success", {timeOut: 3000,});
            }, error => {
                this._toaster.error("error", "Try Again", {timeOut: 2000,});
                });
                this.EditMode = false;
         }
        }

    
    Add() {
        this.router.navigateByUrl('/theme/carrier');
      }
    deleteCarriers(carrier) {
        if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
            this._carrierservice.DeleteCarrier(carrier._id).subscribe(data => {
            this._toaster.info("Carrier Data Delete", "Success", {timeOut: 3000,});
            this.getData();
            });
         }
    }
}
 