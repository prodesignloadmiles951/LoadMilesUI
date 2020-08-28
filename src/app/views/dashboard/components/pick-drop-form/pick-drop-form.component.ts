import { Component, OnInit,Inject } from '@angular/core';
import { TrucksService } from '../../../../services/trucks.service';
import { DriversService } from '../../../../services/driver.service';
import { TrailerService } from '../../../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pick-drop-form',
  templateUrl: './pick-drop-form.component.html',
  styleUrls: ['./pick-drop-form.component.scss'],
  providers: [TrucksService, TrailerService, , DriversService, ToastrService]
})
export class PickDropFormComponent implements OnInit {
 pickup={}
 driverdata= [];
 trailerData= [];
 unitNumberdata: any;
 pickuppopupForm: FormGroup;
 typeDetails=[]
 loadstatusDetails=[]
  constructor(public dialogRef: MatDialogRef < PickDropFormComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _trailersService: TrailerService,
        private _toaster: ToastrService) {
  	console.log(this.data)
  }

  ngOnInit() {
     if(this.data){
      this.pickup=this.data
    }
  	this.getDriverData()
    this.getTrailerData()
    this.getData()
    this.typeDetails=[
      {
          "ID": 0,
          "Name": "Driver"
      },
      {
          "ID": 1,
          "Name": "carrier"
      }
    ]
    this.loadstatusDetails=[
      {
          "ID": 0,
          "Name": "Booked"
      },
      {
          "ID": 1,
          "Name": "Arrival Delay"
      },
      {
          "ID": 2,
          "Name": "Arrival Ontime"
      },
      {
          "ID": 3,
          "Name": "Loaded Delay"
      },
      {
          "ID": 4,
          "Name": "Loaded Ontime"
      }
    ]
  }
  addfiles(){

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
  resetpickup() {}
  submitpickup(pickup){
  	console.log(pickup)
  	this.dialogRef.close(pickup)
  }
  hidePopup(){
  	this.dialogRef.close(null)
  }

}
