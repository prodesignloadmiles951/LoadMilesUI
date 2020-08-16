import { DriversService } from './../../services/driver.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DriverFilters } from '../../model/driver';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-driver-list',
    templateUrl: './driver-list.component.html',
    providers: [DriversService, ToastrService, ]
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
         private router: Router) {
      
    }

    ngOnInit(): void {
        this.pageFilters = new DriverFilters();
        this.getData();
    }
    viewData(driver) {
      console.log(driver)
      var driverObj=driver
      driverObj['EditMode']=this.EditMode
      this.driverData=driverObj
      this.drivers = new DriverFilters();
      this.drivers = driver;
      this.selectedDriver = driver.firstname;
      this.EditMode = false;
      this.showForm=true
    }

    editData(driver) {
      this.EditMode = true;
      var driverObj=driver
      driverObj['EditMode']=this.EditMode
      this.driverData=driverObj
      this.drivers = new DriverFilters();
      this.drivers = driver;
      this.selectedDriver = driver.firstname;
      this.showForm=true
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


      editDriver(driver,selectedDriver) {
        this._driverService.EditDrivers(driver).subscribe(response => {
          this._toaster.success(selectedDriver+ " driver successfully updated", "Success");
        }, error => {
           this._toaster.error("error", "Try Again");
          });
          this.EditMode = false;
      }

      // deleteDriver(driver) {
      //   this._driverService.DeleteDrivers(driver._id).subscribe(data => {
      //     this._toaster.info("Driver Data Delete", "Success");
      //     this.getData();
      //    });
      //  }

       Add() {
        this.router.navigateByUrl('/theme/driver');
      }
}
