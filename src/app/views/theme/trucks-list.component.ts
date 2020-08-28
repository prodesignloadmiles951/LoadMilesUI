import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrucksService } from '../../services/trucks.service';
import { CompanyService } from '../../services/company.service';
import { CompanyFilters } from './../../model/companydetails';
import { TrucksFilters } from '../../model/trucks';
import {Router} from '@angular/router';

@Component({
    selector: 'app-trucks-list',
    templateUrl: './trucks-list.component.html',
    providers: [TrucksService, ToastrService]
})
export class TruckslistComponent implements OnInit {
  public company: CompanyFilters;
  public trucks={}
    pageFilters={}
    Truckslistdata = new Array<TrucksFilters>();
    submitted: boolean;
    truckdata=[];
    data: any;
    selectedTruck: any;
    selectedCompany: any;
    EditMode: boolean;
    truckData={}
    showForm=false
 
    constructor(private _toaster: ToastrService,
      private _trucksservice: TrucksService,
      private router: Router) {
         }

    ngOnInit() {
      this.getData();
  }
  viewData(truck) {
    this.EditMode = false;
    var truckObj=truck
    truckObj['EditMode']=this.EditMode
    this.truckData=truckObj
    this.trucks = new TrucksFilters();
    this.trucks = truck;
    this.selectedTruck = truck.truckunitnumber;
    this.showForm=true
  }
  getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.truckdata = data;
    });
  }

  editData(truck) {
    this.EditMode = true;
    var truckObj=truck
    truckObj['EditMode']=this.EditMode
    this.truckData=truckObj
    this.trucks = new TrucksFilters();
    this.trucks = truck;
    this.selectedTruck = truck.truckunitnumber;
    this.showForm=true

  }
   hidePopup(){
      this.showForm=false
    }

  editTrucks(trucks,selectedTruck) {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
        trucks['companyid']=localStorage.selectedCompany
        this._trucksservice.EditTrucks(trucks).subscribe(response => {
          this._toaster.success(selectedTruck+ " truck successfully updated", "Success", {timeOut: 3000,});
        }, error => {
           this._toaster.error("error", "Try Again", {timeOut: 2000,});
          });
          this.EditMode = false;
       }
  }

  Add() {
    this.router.navigateByUrl('/theme/trucks');
  }

  deleteTrucks(truck) {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
          this._trucksservice.DeleteTrucks(truck._id).subscribe(data => {
          this._toaster.info("Trucks Data Deleted", "Success", {timeOut: 3000,});
          this.getData();
         });
       }
   }
}
 