import { CompanyFilters } from './../../model/companydetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { CreateloadService } from '../../services/createload.service';
import { TrucksService } from '../../services/trucks.service';
import { TruckformComponent } from '../theme/truckform/truckform.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DriversService } from './../../services/driver.service';
import { DriverformComponent } from '../theme/driverform/driverform.component';
import { DispatcherformComponent } from '../theme/dispatcherform/dispatcherform.component'
import { DispatcherService } from '../../services/dispatcher.service';
import { AuthenticationService } from '../../views/authentication.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.css'],
  providers: [ToastrService, TrucksService, DriversService, DispatcherService]
})
export class DashboardComponent implements OnInit {
	truckdata=[];
	data: any;
	Dispatcherdata = [];
	constructor( private router: Router, 
		private _driverService: DriversService,
		private _dispatcherService: DispatcherService,
		public dialog: MatDialog, private _trucksservice: TrucksService,
    private authService: AuthenticationService) {
 }
  ngOnInit() {
    if (this.authService.getloginUser()) {}
  }

 createLoad() {
    this.router.navigateByUrl('/dashboard/createload');
  }

  onTruckAdd() {
    let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
    let editDialogRef = this.dialog.open(TruckformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if(data == null){}else{
        this.getData()        
      }
    })
  }
  onDriverAdd() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(DriverformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getdriverData()        
          }
        })
      }
   onDispatcherAdd() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(DispatcherformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getDispatcherData()        
          }
        })
      }
   getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.Dispatcherdata = data;
    });
  }
  getdriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.data = data;
        });
      }

  getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.truckdata = data;
    });
  }
 
}
