import { Component, OnInit,Input } from '@angular/core';
import { CreateloadService } from '../../../../services/createload.service'
import { DriversService } from '../../../../services/driver.service';
import { TrucksService } from '../../../../services/trucks.service';
import { TrailerService } from '../../../../services/trailers.service';
import { PickupserviceService } from '../../../../services/pickupservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss'],
  providers: [TrucksService, DriversService, TrailerService, PickupserviceService]
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
  constructor(private _loadservice: CreateloadService, 
    private _driverService: DriversService, private _trucksservice: TrucksService,private _toaster: ToastrService, 
    private _trailersService: TrailerService, private _pickup: PickupserviceService) { }

  onAdd(eventName) {
    console.log(eventName.key) 
    var pickupdata = eventName.key
    this.SendPickupForm(pickupdata)
  }
  SendPickupForm(pickupdata){
    var pickupinfo = {}
    
    pickupinfo['_id']=sessionStorage.getItem('submitID')
    pickupinfo['ContactNumber']= JSON.parse(pickupdata['ContactNumber'])
    pickupinfo['PickupDate']= new Date(pickupdata['PickupDate']).getTime()
    pickupinfo['PickupCompany'] = pickupdata['PickupCompany']
    pickupinfo['ContactName'] = pickupdata['ContactName']
    pickupinfo['Address'] = pickupdata['Address']

    for (var i = 0; i < this.typeDetails.length; i++) {
      if(this.typeDetails[i]['ID'] == JSON.parse(pickupdata['Type'])){
        pickupinfo['Type']= this.typeDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.driverDetails.length; i++) {
      if(this.driverDetails[i]['ID'] == JSON.parse(pickupdata['Driver1'])){
        pickupinfo['Driver1']= this.driverDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.driverDetails.length; i++) {
      if(this.driverDetails[i]['ID'] == JSON.parse(pickupdata['Driver2'])){
        pickupinfo['Driver2']= this.driverDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.truckDetails.length; i++) {
      if(this.truckDetails[i]['ID'] == JSON.parse(pickupdata['Truck'])){
        pickupinfo['Truck']= this.truckDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.trailerDetails.length; i++) {
      if(this.trailerDetails[i]['ID'] == JSON.parse(pickupdata['Trailer'])){
        pickupinfo['Trailer']= this.trailerDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.loadstatusDetails.length; i++) {
      if(this.loadstatusDetails[i]['ID'] == JSON.parse(pickupdata['LoadStatus'])){
        pickupinfo['LoadStatus']= this.loadstatusDetails[i]['Name']
        break
      }
    }
    this._pickup.SendPickupForm(pickupinfo).subscribe(data => {
      this.data = data
      this._toaster.success("Pickup successfully created", "Success");
    }, error => {
       this._toaster.error("error", "Try Again");
        console.log(this.data)
    })
  }
  getPickupForm(){
    this._pickup.getpickupData().subscribe(data => {
      this.data = data
      console.log(this.data)
    })
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
    // this.getPickupForm()
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
