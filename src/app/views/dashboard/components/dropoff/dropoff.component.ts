import { Component, OnInit, Input } from '@angular/core';
import { CreateloadService } from '../../../../services/createload.service'
import { DriversService } from '../../../../services/driver.service';
import { TrucksService } from '../../../../services/trucks.service';
import { TrailerService } from '../../../../services/trailers.service';
import { DropoffserviceService } from '../../../../services/dropoffservice.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private _loadservice: CreateloadService, 
    private _driverService: DriversService, private _trucksservice: TrucksService, private _toaster: ToastrService,
    private _trailersService: TrailerService, private _dropoff: DropoffserviceService) { }

   onAdd(eventName) {
    console.log(eventName.key) 
    var dropoffdata = eventName.key
    this.SendDropoffform(dropoffdata)
  }

  onDelete(eventName) {
    console.log(eventName.key)
    this._loadservice.deleteLoadData(eventName.key).subscribe(data => {
      console.log(data)
    });
  }

   SendDropoffform(dropoffdata){

    var dropoffinfo = {}
    dropoffinfo['_id']=sessionStorage.getItem('submitID')
    dropoffinfo['dropContnumber']= JSON.parse(dropoffdata['dropContnumber'])
    dropoffinfo['DropoffDate']= new Date(dropoffdata['DropoffDate']).getTime()
    dropoffinfo['dropCompany'] = dropoffdata['dropCompany']
    dropoffinfo['dropContact'] = dropoffdata['dropContact']
    dropoffinfo['dropAddress'] = dropoffdata['dropAddress']
    
    for (var i = 0; i < this.typeDetails.length; i++) {
      if(this.typeDetails[i]['ID'] == JSON.parse(dropoffdata['Type'])){
        dropoffinfo['Type']= this.typeDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.driverDetails.length; i++) {
      if(this.driverDetails[i]['ID'] == JSON.parse(dropoffdata['Driver1'])){
        dropoffinfo['Driver1']= this.driverDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.driverDetails.length; i++) {
      if(this.driverDetails[i]['ID'] == JSON.parse(dropoffdata['Driver2'])){
        dropoffinfo['Driver2']= this.driverDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.truckDetails.length; i++) {
      if(this.truckDetails[i]['ID'] == JSON.parse(dropoffdata['Truck'])){
        dropoffinfo['Truck']= this.truckDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.trailerDetails.length; i++) {
      if(this.trailerDetails[i]['ID'] == JSON.parse(dropoffdata['Trailer'])){
        dropoffinfo['Trailer']= this.trailerDetails[i]['Name']
        break
      }
    }
    for (var i = 0; i < this.loadstatusDetails.length; i++) {
      if(this.loadstatusDetails[i]['ID'] == JSON.parse(dropoffdata['loadStatus'])){
        dropoffinfo['LoadStatus']= this.loadstatusDetails[i]['Name']
        break
      }
    }
    this._dropoff.SendDropoffform(dropoffinfo).subscribe(data => {
      this.data = data
      this._toaster.success("Dropoff successfully created", "Success");
    }, error => {
       this._toaster.error("error", "Try Again");
        console.log(this.data)
    })
  }

  getDropoffForm(){
    this._dropoff.getdroppoffData().subscribe(data => {
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

  ngOnInit() {
    this.getDriverData()
    this.getTruckData()
    this.getTrailerData()
    // this.getDropoffForm()
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

}
