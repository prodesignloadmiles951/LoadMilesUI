import { ToastrService } from 'ngx-toastr';
import { DriversService } from './../../services/driver.service';
import { Component, OnInit} from '@angular/core';
import { DriverFilters } from '../../model/driver';
import { Router } from '@angular/router';

@Component({
    selector: 'app-driver-list',
    templateUrl: './driver-list.component.html',
    providers: [ToastrService, DriversService]
})
export class DriverlistComponent implements OnInit {
    public pageFilters: DriverFilters;
    Driverlistdata = new Array<DriverFilters>();
    model: any = {};
    submitted: boolean;
    data: any;
    selectedDriver: any;
    EditMode: boolean;
    drivers: DriverFilters;

    constructor(
        private router: Router,
        private _driversService: DriversService,
        private _toaster: ToastrService) { }

    ngOnInit(): void {
        this.pageFilters = new DriverFilters();
        this.getData();
    }

    viewData(driver) {
        this.EditMode = false;
        this.drivers = new DriverFilters();
        this.drivers = driver;
        this.selectedDriver = driver.plate;
      }

    submit() {
        //console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/driver');
      }

      getData() {
        this._driversService.getDriversData().subscribe(data => {
          this.data = data;
        });
      }

      editDrivers(driver) {
        this._driversService.EditDrivers(driver._id).subscribe(response => {
          this._toaster.success("Driver successfull updated", "Success");
        }, error => {
           this._toaster.error("error", "Try Again");
          });
      }
    
      deleteDrivers(driver) {
        this._driversService.DeleteDrivers(driver._id).subscribe(data => {
        this._toaster.info("Driver Data Delete", "Success");
        this.getData();
       });
       }
}
