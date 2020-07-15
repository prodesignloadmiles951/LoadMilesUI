import { Component, OnInit,Input } from '@angular/core';
import { CreateloadService } from '../../../../services/createload.service'
import { DriversService } from '../../../../services/driver.service';
import { TrucksService } from '../../../../services/trucks.service';
import { TrailerService } from '../../../../services/trailers.service';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss'],
  providers: [TrucksService, DriversService, TrailerService]
})
export class PickupComponent implements OnInit {
  data=[]
  drivertypeDetails=[]
  driverDetails=[]
  typeDetails=[]
  trailerDetails=[]
  truckDetails=[]
  loadstatusDetails=[]
  unitNumberdata: any;
  constructor(private _loadservice: CreateloadService, private _driverService: DriversService, private _trucksservice: TrucksService, private _trailersService: TrailerService) { }

  onAdd(eventName) {
    console.log(eventName.key) 
    // var obj=eventName.key
    // obj['slno']=this.data.length+1
    // this.data.push(obj)
    // this._loadservice.addLoadData(eventName.key).subscribe(data => {
    //   console.log(data)
    // });
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
  onEdit(eventName) {
    console.log(eventName.key)
    var obj=eventName.key
    console.log(obj.PickupDate)
    var date=obj.PickupDate
    console.log(date.getTime())
    // this._loadservice.editLoadData(eventName.key).subscribe(data => {
    //   console.log(data)
    // });
  }
  onDelete(eventName) {
    console.log(eventName.key)
    this._loadservice.deleteLoadData(eventName.key).subscribe(data => {
      console.log(data)
    });
  }


  onSelect(e){
    console.log(e)
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

}
