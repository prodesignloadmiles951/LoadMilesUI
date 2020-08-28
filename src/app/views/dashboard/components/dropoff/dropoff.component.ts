import { Component, OnInit, Input } from '@angular/core';
import { CreateloadService } from '../../../../services/createload.service'
import { DriversService } from '../../../../services/driver.service';
import { TrucksService } from '../../../../services/trucks.service';
import { TrailerService } from '../../../../services/trailers.service';
import { DropoffserviceService } from '../../../../services/dropoffservice.service';
import { ToastrService } from 'ngx-toastr';
import { DropoffpopupformComponent} from '../dropoffpopupform/dropoffpopupform.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  dropoffdata=[]
  dropOffdetails: any;
  dropoffpopupdata=[];
  constructor(private _loadservice: CreateloadService, 
    private _driverService: DriversService, private _trucksservice: TrucksService, private _toaster: ToastrService,
    private _trailersService: TrailerService, private _dropoff: DropoffserviceService, public dialog: MatDialog) { }


   SendDropoffform(dropoffdata){
    var dropoffinfo = {}
    dropoffinfo['_id']=sessionStorage.getItem('submitID')
    dropoffinfo['dropContnumber']= dropoffdata['contactnumber']
    dropoffinfo['DropoffDate']= new Date(dropoffdata['dropoffdate']).getTime()
    dropoffinfo['dropCompany'] = dropoffdata['dropoffcompany']
    dropoffinfo['dropContact'] = dropoffdata['contactname']
    dropoffinfo['dropAddress'] = dropoffdata['address']
    dropoffinfo['Type'] = dropoffdata['type']
    dropoffinfo['Driver1'] = dropoffdata['driver1']
    dropoffinfo['Driver2'] = dropoffdata['driver2']
    dropoffinfo['Truck'] = dropoffdata['truck']
    dropoffinfo['Trailer'] = dropoffdata['trailer']
    dropoffinfo['LoadStatus'] = dropoffdata['loadstatus']

    if(dropoffinfo['_id'] != null){
      this._dropoff.SendDropoffform(dropoffinfo).subscribe(data => {
        this.data = data
        this._toaster.success("Dropoff successfully created", "Success");
      }, error => {
         this._toaster.error("error", "Try Again");
          console.log(this.data)
      })
    }else{
      this._toaster.error("Create Load First", "Try Again");
    }
  }
  editDropoff(dropoffinfo){
    dropoffinfo['_id']=sessionStorage.getItem('submitID')
    this._dropoff.EditDropoff(dropoffinfo).subscribe(data => {
      this.data = data
      this._toaster.success("Dropoff successfully updated", "Success");
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
    this.dropoffpopupdata= JSON.parse(sessionStorage.getItem("dropOffdetails"))
    console.log(this.dropoffpopupdata)
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
  onDropoffAdd(){
    this.dialog.open(DropoffpopupformComponent, {
            data: {}
    }).afterClosed().subscribe((confirm) => {
        console.log(confirm)
        if(confirm !=null){
          this.SendDropoffform(confirm)
          var submitId=sessionStorage.getItem('submitID')
          if(submitId != null){
            if(this.dropoffpopupdata == null){
              var dropOffArry=[]
            }else{
              var dropOffArry=this.dropoffpopupdata            
            }
            dropOffArry.push(confirm)
            for (var i = 0; i < dropOffArry.length; i++) {
              dropOffArry[i]['SlNo']=i+1
            }
            this.dropoffpopupdata=dropOffArry
            console.log(this.dropoffpopupdata)
            sessionStorage.setItem('dropOffdetails',JSON.stringify(this.dropoffpopupdata))
          }
        }
    })
  }
  ondropEdit(dataedit){
    console.log(dataedit.data)
    let editDataIndex=dataedit.rowIndex
    this.dialog.open(DropoffpopupformComponent, {
            data: dataedit.data
    }).afterClosed().subscribe((res) => {
        console.log(res)
        if(res !=null){
          this.dropoffpopupdata.splice(editDataIndex,1)
          this.dropoffpopupdata.splice(editDataIndex,0,res)
          sessionStorage.setItem('dropOffdetails',JSON.stringify(this.dropoffpopupdata))
          this.editDropoff(res)
        }
    })
  }
  ondropDelete(data){
    console.log(data.rowIndex)
    this.dropoffpopupdata.splice(data.rowIndex,1)
    for (var i = 0; i < this.dropoffpopupdata.length; i++) {
        this.dropoffpopupdata[i]['SlNo']=i+1
    }
    this._loadservice.deleteLoadData(data.data).subscribe(data => {
      console.log(data)
    });
    sessionStorage.setItem('dropOffdetails',JSON.stringify(this.dropoffpopupdata))
  }

}
