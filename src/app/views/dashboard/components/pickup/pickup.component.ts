import { Component, OnInit,Input } from '@angular/core';
import { CreateloadService } from '../../../../services/createload.service'
import { DriversService } from '../../../../services/driver.service';
import { TrucksService } from '../../../../services/trucks.service';
import { TrailerService } from '../../../../services/trailers.service';
import { PickupserviceService } from '../../../../services/pickupservice.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickDropFormComponent } from '../pick-drop-form/pick-drop-form.component';


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
  pickuppopupdata=[];
  pickupdetails: any;
  @Input()pickupdata;
  constructor(private _loadservice: CreateloadService, 
    private _driverService: DriversService, private _trucksservice: TrucksService,private _toaster: ToastrService, 
    private _trailersService: TrailerService, private _pickup: PickupserviceService, public dialog: MatDialog) { }

  
  SendPickupForm(pickupdata){
    var pickupinfo = {}
    
    pickupinfo['_id']=sessionStorage.getItem('submitID')
    pickupinfo['ContactNumber']= pickupdata['contactnumber']
    pickupinfo['PickupDate']= new Date(pickupdata['pickupdate']).getTime()
    pickupinfo['PickupCompany'] = pickupdata['pickupcompany']
    pickupinfo['ContactName'] = pickupdata['contactname']
    pickupinfo['Address'] = pickupdata['address']
    pickupinfo['Type'] = pickupdata['type']
    pickupinfo['Driver1'] = pickupdata['driver1']
    pickupinfo['Driver2'] = pickupdata['driver2']
    pickupinfo['Truck'] = pickupdata['truck']
    pickupinfo['Trailer'] = pickupdata['trailer']
    pickupinfo['LoadStatus'] = pickupdata['loadstatus']

    // for (var i = 0; i < this.typeDetails.length; i++) {
    //   if(this.typeDetails[i]['ID'] == JSON.parse(pickupdata['Type'])){
    //     pickupinfo['Type']= this.typeDetails[i]['Name']
    //     break
    //   }
    // }
    
    console.log(pickupinfo)
    if(pickupinfo['_id'] != null){
      this._pickup.SendPickupForm(pickupinfo).subscribe(data => {
        this.data = data
        this._toaster.success("Pickup successfully created", "Success");
      }, error => {
         this._toaster.error("error", "Try Again");
          console.log(this.data)
      })
    }else{
      this._toaster.error("Create Load first", "Try Again");
    }
  }
  getPickupForm(){
    this._pickup.getpickupData().subscribe(data => {
      this.data = data
      console.log(this.data)
    })
  }
  editPickup(pickupinfo){
    // pickupinfo['_id']=sessionStorage.getItem('submitID')
     this._pickup.EditPickup(pickupinfo).subscribe(data => {
      this.data = data
      this._toaster.success("Pickup successfully updated", "Success");
    }, error => {
       this._toaster.error("error", "Try Again");
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
 
  // onDelete(eventName) {
  //   console.log(eventName.key)
  //   this._loadservice.deleteLoadData(eventName.key).subscribe(data => {
  //     console.log(data)
  //   });
  // }


  ngOnInit() {
    if(this.pickupdata != undefined){
      this.pickuppopupdata.push(this.pickupdata)
    }else{
      this.pickuppopupdata= JSON.parse(sessionStorage.getItem("pickupdetails"))
    }
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
  onPickupAdd(){
    this.dialog.open(PickDropFormComponent, {
            data: {}
    }).afterClosed().subscribe((confirm) => {
        console.log(confirm)
        if(confirm !=null){
          this.SendPickupForm(confirm)
          var submitId=sessionStorage.getItem('submitID')
          if(submitId != null){
            if(this.pickuppopupdata == null){
              var pickUpArry=[]
            }else{
              var pickUpArry=this.pickuppopupdata            
            }
            pickUpArry.push(confirm)
            for (var i = 0; i < pickUpArry.length; i++) {
              pickUpArry[i]['SlNo']=i+1
            }
            this.pickuppopupdata=pickUpArry
            console.log(this.pickuppopupdata)
            sessionStorage.setItem('pickupdetails',JSON.stringify(this.pickuppopupdata))
          }
        }
    })
  }

  onpickEdit(dataedit){
    console.log(dataedit.data)
    let editDataIndex=dataedit.rowIndex
    this.dialog.open(PickDropFormComponent, {
            data: dataedit.data
    }).afterClosed().subscribe((res) => {
        if(res !=null){
          this.pickuppopupdata.splice(editDataIndex,1)
          this.pickuppopupdata.splice(editDataIndex,0,res)
          sessionStorage.setItem('pickupdetails',JSON.stringify(this.pickuppopupdata))
          this.editPickup(res)
        }
    })
  }
  onpickDelete(data){
    console.log(data.data)
   this.pickuppopupdata.splice(data.rowIndex,1)
    for (var i = 0; i < this.pickuppopupdata.length; i++) {
        this.pickuppopupdata[i]['SlNo']=i+1
    }
    this._loadservice.deleteLoadData(data.data).subscribe(data => {
      console.log(data)
    });
    sessionStorage.setItem('pickupdetails',JSON.stringify(this.pickuppopupdata))
  }

}
