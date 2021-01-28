import { CompanyFilters } from './../../model/company-details';
import { CarrierService } from './../../services/carrier.service';
import { Component, OnInit} from '@angular/core';
import { CarrierFilters } from '../../model/carrier';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarrierformComponent } from './carrierform/carrierform.component'

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
        private router: Router, public dialog: MatDialog) { }

        ngOnInit() {
            this.getData();
        }
    viewData(carrier) {
        var carrierObj=carrier
        carrierObj['EditMode']=false
        let dialogConfig = Object.assign({ width: "1000px" },{ data: carrierObj })
        let viewDialogRef = this.dialog.open(CarrierformComponent, dialogConfig);
        viewDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
        })
    }
    getData() {
    this._carrierservice.getCarrierData().subscribe(data => {
        this.data = data;
    });
    }

    editData(carrier) {
        var carrierObj=carrier
        carrierObj['EditMode']=true
        let dialogConfig = Object.assign({ width: "1000px" },{ data: carrierObj })
        let editDialogRef = this.dialog.open(CarrierformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
        })
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
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(CarrierformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
        })
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
 