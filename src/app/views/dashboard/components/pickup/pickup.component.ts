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
    
    pickupinfo['load_id']=sessionStorage.getItem('submitID')
    pickupinfo['ContactNumber']= pickupdata['ContactNumber']
    pickupinfo['PickupDate']= new Date(pickupdata['PickupDate']).getTime()
    pickupinfo['PickupCompany'] = pickupdata['PickupCompany']
    pickupinfo['ContactName'] = pickupdata['ContactName']
    pickupinfo['Address'] = pickupdata['address1'] +","+ pickupdata['address2']
    pickupinfo['Type'] = pickupdata['Type']
    pickupinfo['Driver1'] = pickupdata['Driver1']
    pickupinfo['Driver2'] = pickupdata['Driver2']
    pickupinfo['Truck'] = pickupdata['Truck']
    pickupinfo['Trailer'] = pickupdata['Trailer']
    pickupinfo['LoadStatus'] = pickupdata['LoadStatus']
    pickupinfo['city'] = pickupdata['city']
    pickupinfo['country'] = pickupdata['country']
    pickupinfo['pickupref'] = pickupdata['pickupref']
    pickupinfo['pickuptime'] = pickupdata['pickuptime']
    pickupinfo['state'] = pickupdata['state']
    pickupinfo['zipcode'] = pickupdata['zipcode']

    // for (var i = 0; i < this.typeDetails.length; i++) {
    //   if(this.typeDetails[i]['ID'] == JSON.parse(pickupdata['Type'])){
    //     pickupinfo['Type']= this.typeDetails[i]['Name']
    //     break
    //   }
    // }
    
    console.log(pickupinfo)
    if(pickupinfo['load_id'] != null){
      this._pickup.SendPickupForm(pickupinfo).subscribe(data => {
        console.log(data)
        if(this.pickuppopupdata != null){
          this.pickuppopupdata.push(data.data)
        }else{
          this.pickuppopupdata=[]
          this.pickuppopupdata.push(data.data)
        }
        console.log(this.pickuppopupdata)
        this._toaster.success("Pickup successfully created", "Success");
        sessionStorage.setItem('pickupdetails',JSON.stringify(this.pickuppopupdata))
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
    console.log(this.pickupdata)
    if(this.pickupdata != undefined){
    if(this.pickupdata.length > 0){
      this.pickuppopupdata=this.pickupdata
    }else{
      this.pickuppopupdata= JSON.parse(sessionStorage.getItem("pickupdetails"))
    }
  }
    // this.getDriverData()
    // this.getTruckData()
    // this.getTrailerData()
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
        var pickUpArry=[]
        if(confirm !=null){
          // if(this.pickupdata['loadstatuspickupedit']){
          //   pickUpArry.push(confirm)
          //   for (var i = 0; i < pickUpArry.length; i++) {
          //     pickUpArry[i]['SlNo']=i+1
          //   }
          //   this.pickuppopupdata=pickUpArry
          // }
            this.SendPickupForm(confirm)
            var submitId=sessionStorage.getItem('submitID')
            console.log(submitId)
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
    console.log(data)
    console.log(data.data)
   this.pickuppopupdata.splice(data.rowIndex,1)
    for (var i = 0; i < this.pickuppopupdata.length; i++) {
        this.pickuppopupdata[i]['SlNo']=i+1
    }
    this._pickup.DeletePickup(data.data).subscribe(data => {
      console.log(data)
      this._toaster.success("Pickup successfully deleted", "Success", {timeOut: 3000});
    });
    sessionStorage.setItem('pickupdetails',JSON.stringify(this.pickuppopupdata))
  }

}
