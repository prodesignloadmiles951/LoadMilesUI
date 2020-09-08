import { DriversService } from './../../services/driver.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DriverFilters } from '../../model/driver';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DriverformComponent } from './driverform/driverform.component'

@Component({
    selector: 'app-driver-list',
    templateUrl: './driver-list.component.html',
    providers: [DriversService, ToastrService ]
})
export class DriverlistComponent implements OnInit {
  public drivers: DriverFilters;
    pageFilters: DriverFilters;
    Driverlistdata = new Array<DriverFilters>();
    model: any = {};
    submitted: boolean; 
    data: any;
    selectedDriver: any;
    EditMode=false
    showForm=false
    driverData={}

    constructor(private _toaster: ToastrService,
         private _driverService: DriversService,
         private router: Router, public dialog: MatDialog) {
      
    }

    ngOnInit(): void {
        this.pageFilters = new DriverFilters();
        this.getData();
    }
    viewData(driver) {

      var driverObj=driver
      driverObj['EditMode']=false
      let dialogConfig = Object.assign({ width: "1000px" },{ data: driverObj })
      let viewDialogRef = this.dialog.open(DriverformComponent, dialogConfig);
      viewDialogRef.afterClosed().subscribe((data) => {
        console.log(data)
      })
    }

    editData(driver) {

      var driverObj=driver
      driverObj['EditMode']=true
      let dialogConfig = Object.assign({ width: "1000px" },{ data: driverObj })
      let editDialogRef = this.dialog.open(DriverformComponent, dialogConfig);
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

    // submit() {
    //     this.submitted = true;
    //     this._driverService.SendForm(this.pageFilters).subscribe(response => {
    //       this.submitted = true;
    //       this._toaster.info("Driver data submitted successfully","Success");
    //       this.router.navigateByUrl("theme/driver");
    //     },error=>{
    //       this.submitted=false;
    //       this._toaster.error("Submit Agian","Faild");
    //     });
    //     // console.log(this.pageFilters);
    //    }

       getData() {
        this._driverService.getDriversData().subscribe(data => {
          this.data = data;
        });
      }


      editDriver(drivers,selectedDriver) {
        if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
          drivers['companyid']=localStorage.selectedCompany
          this._driverService.EditDrivers(drivers).subscribe(response => {
            this._toaster.success(selectedDriver+ " driver successfully updated", "Success", {timeOut: 3000,});
          }, error => {
             this._toaster.error("error", "Try Again", {timeOut: 2000,});
            });
            this.EditMode = false;
         }
      }

      deleteDriver(driver) {
        if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
          this._driverService.DeleteDrivers(driver._id).subscribe(data => {
            this._toaster.info("Driver Data Deleted", "Success", {timeOut: 2000,});
            this.getData();
           });
         }
       }

       Add() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(DriverformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
        })
      }
}
