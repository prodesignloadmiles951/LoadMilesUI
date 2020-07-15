import { Component, OnInit, Input } from '@angular/core';
import { CreateloadService } from '../../../../services/createload.service'
import { DriversService } from '../../../../services/driver.service';
import { TrucksService } from '../../../../services/trucks.service';
import { TrailerService } from '../../../../services/trailers.service';

@Component({
  selector: 'app-dropoff',
  templateUrl: './dropoff.component.html',
  styleUrls: ['./dropoff.component.scss'],
  providers: [TrucksService, DriversService, TrailerService]
})
export class DropoffComponent implements OnInit {
  data=[]
  drivertypeDetails=[]
  typeDetails=[]
  driverDetails=[]
  trailerDetails=[]
  truckDetails=[]
  loadstatusDetails=[]
  constructor(private _loadservice: CreateloadService, private _driverService: DriversService, private _trucksservice: TrucksService, private _trailersService: TrailerService) { }

  logEvent(e){
    
  }

  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
        for (var i = 0; i < data.length; i++) {
                    var driverDetails = {}
                    driverDetails['ID']=i
                    driverDetails['Name']=data[i].firstname
                    this.driverDetails.push(driverDetails)
                  }          

        });
      }
   getTruckData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
              var truckDetails = {}
              truckDetails['ID']=i
              truckDetails['Name']=data[i].truckunitnumber
              this.truckDetails.push(truckDetails)
              console.log(this.truckDetails)
            }  
    });
  }
  getTrailerData() {
        this._trailersService.getTrailersData().subscribe(data => {
          for (var i = 0; i < data.length; i++) {
              var trailerDetails = {}
              trailerDetails['ID']=i
              trailerDetails['Name']=data[i].unitNumber
              this.trailerDetails.push(trailerDetails)
              console.log(this.trailerDetails)
            } 
        });
      }

  ngOnInit() {
    this.getDriverData()
    this.getTruckData()
    this.getTrailerData()
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
    // this.driverDetails=[
    //   {
    //       "ID": 0,
    //       "Name": "Dan"
    //   },
    //   {
    //       "ID": 1,
    //       "Name": "Steve"
    //   },
    //   {
    //       "ID": 2,
    //       "Name": "Max"
    //   }
    // ]
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
    // this.trailerDetails=[
    //   {
    //       "ID": 0,
    //       "Name": "FLB654"
    //   },
    //   {
    //       "ID": 1,
    //       "Name": "GXV5654"
    //   },
    //   {
    //       "ID": 2,
    //       "Name": "KLO767"
    //   }
    // ]
    // this.truckDetails=[
    //   {
    //       "ID": 0,
    //       "Name": "FLB654"
    //   },
    //   {
    //       "ID": 1,
    //       "Name": "GXV5654"
    //   },
    //   {
    //       "ID": 2,
    //       "Name": "KLO767"
    //   }
    // ]
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

}
