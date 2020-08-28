import { Component, OnInit,Inject } from '@angular/core';
import { TrucksService } from '../../../../services/trucks.service';
import { DriversService } from '../../../../services/driver.service';
import { TrailerService } from '../../../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dropoffpopupform',
  templateUrl: './dropoffpopupform.component.html',
  styleUrls: ['./dropoffpopupform.component.scss'],
  providers: [TrucksService, TrailerService, , DriversService, ToastrService]
})
export class DropoffpopupformComponent implements OnInit {
dropoffpopupForm: FormGroup;
driverdata= [];
 trailerData= [];
 unitNumberdata: any;
 dropoff={}
 loadstatusDetails=[];
 drivertypeDetails=[];
 typeDetails=[];
  constructor(public dialogRef: MatDialogRef < DropoffpopupformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _trailersService: TrailerService,
        private _toaster: ToastrService) { }

  ngOnInit() {
    if(this.data){
      this.dropoff=this.data
    }
  	this.getDriverData()
    this.getTrailerData()
    this.getData()
       this.drivertypeDetails=[
      {
          "ID": 0,
          "Name": "Solo"
      },
      {
          "ID": 1,
          "Name": "Team"
      }
    ]
    this.typeDetails=[
      {
          "ID": 0,
          "Name": "Driver"
      },
      {
          "ID": 1,
          "Name": "Carrier"
      }
    ]

    this.loadstatusDetails=[
      {
          "ID": 0,
          "Name": "In Transit"
      },
      {
          "ID": 1,
          "Name": "Delivery Delay"
      },
      {
          "ID": 2,
          "Name": "Delivery Ontime"
      },
      {
          "ID": 3,
          "Name": "Completed"
      }
    ]
  }
  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.driverdata = data;
          console.log(this.driverdata)
        });
      }
  getTrailerData() {
        this._trailersService.getTrailersData().subscribe(data => {
          this.trailerData = data;
        });
      } 
  getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.unitNumberdata = data;
    });
  }
  resetdropoff(){}
  submitdropoff(dropoff){
  	console.log(dropoff)
  	this.dialogRef.close(dropoff)
  }
   hidePopup(){
  	this.dialogRef.close(null)
  }
}
