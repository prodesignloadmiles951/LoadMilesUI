import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrucksService } from '../../services/trucks.service';
import { CompanyService } from '../../services/company.service';
import { CompanyFilters } from './../../model/companydetails';
import { TrucksFilters } from '../../model/trucks';
import { Router} from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TruckformComponent } from './truckform/truckform.component';

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
    SearchText: any;
    truckData={};
    Isusersloading: boolean;
 
    constructor(private _toaster: ToastrService,
      private _trucksservice: TrucksService,
      private router: Router,public dialog: MatDialog) { }

    ngOnInit() {
      this.Isusersloading = false;
      this.getData();
  }
  viewData(truck) {
    var truckObj=truck
    truckObj['EditMode']=false
    let dialogConfig = Object.assign({ width: "1000px" },{ data: truckObj })
    let viewDialogRef = this.dialog.open(TruckformComponent, dialogConfig);
    viewDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
    })
  }
  getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.truckdata = data.result;
    });
  }

  editData(truck) {
    var truckObj=truck
    truckObj['EditMode']=true
    let dialogConfig = Object.assign({ width: "1000px" },{ data: truckObj })
    let editDialogRef = this.dialog.open(TruckformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if(data == null){}else{
        this.getData()        
      }
    })

  }

  editTrucks(trucks,selectedTruck) {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
        trucks['companyid']=localStorage.selectedCompany
        this._trucksservice.EditTrucks(trucks, trucks['_id']).subscribe(response => {
          this._toaster.success(selectedTruck+ " truck successfully updated", "Success", {timeOut: 3000,});
        }, error => {
           this._toaster.error("error", "Try Again", {timeOut: 2000,});
          });
       }
  }

  Add() {
    let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
    let editDialogRef = this.dialog.open(TruckformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if(data == null){}else{
        this.getData()        
      }
    })
  }

  deleteTruck(truck) {
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
 