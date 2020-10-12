import { Component, OnInit,Inject } from '@angular/core';
import { TrucksService } from '../../../../services/trucks.service';
import { DriversService } from '../../../../services/driver.service';
import { TrailerService } from '../../../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickupserviceService } from '../../../../services/pickupservice.service';

@Component({
  selector: 'app-dropoffpopupform',
  templateUrl: './dropoffpopupform.component.html',
  styleUrls: ['./dropoffpopupform.component.scss'],
  providers: [TrucksService, TrailerService, , DriversService, ToastrService, PickupserviceService]
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
 finalArry=[];
 fileArray=[]
 base64FileArray=[]
 item=''
 filedata={}
 showviewedit=false
 inputPostalCode=undefined
 postalCodeList=[]
 debouncePostalCode;
 showspinner=false
 
  constructor(public dialogRef: MatDialogRef < DropoffpopupformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _trailersService: TrailerService,
        private _pickup: PickupserviceService,
        private _toaster: ToastrService) { 
    this.debouncePostalCode = this.debounce(this.postalCodeCheck.bind(this), 1000, null);
  }

  postalCodeCheck(code){
    console.log(code)
    this._pickup.getzipcodeData(this.inputPostalCode).subscribe(data => {
      this.postalCodeList = data.data
      if(status="ok"){
        this.showspinner=false
      }
    });
  }

  ngOnInit() {
    var pickup = JSON.parse(sessionStorage.getItem("Pickup"))
    console.log(pickup)
    console.log(this.data)
    if(this.data['mode']){
      this.dropoff=this.data
      this.inputPostalCode = this.dropoff['zipcode']
    }else if(pickup != undefined){
      this.dropoff['Type'] = pickup['Type']
      this.dropoff['Driver1'] = pickup['Driver1']
      this.dropoff['Driver2'] = pickup['Driver2']
      this.dropoff['Truck'] = pickup['Truck']
      this.dropoff['Trailer'] = pickup['Trailer']      
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
          "Name": "Unload Delay"
      },
      {
          "ID": 4,
          "Name": "Load Completed"
      }
    ]

    console.log(this.dropoff)
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
   addfiles(e){
      var finalArry=e.target.files
      this.base64FileArray=[]
      this.fileArray=finalArry
        if(finalArry.length > 0){
          for (var i = 0; i < finalArry.length; i++) {
            var objFile={}
            objFile['name']=finalArry[i]['name']
            objFile['size']=finalArry[i]['size']
            objFile['type']=finalArry[i]['type']
            this.finalArry.push(objFile) 
            const reader = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(finalArry[i]);
          }
        sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
        this.finalArry=JSON.parse(sessionStorage.file_upload)
      }
  }
  handleReaderLoaded(e,name) {
    this.item=''
    var string = btoa(e.target.result);
    this.item= "data:application/vnd.ms-excel;base64,"+string
    var obj={}
    obj['file']=this.item
    this.base64FileArray.push(obj)
  }
  onUploadFile(){
      let arr3 = this.finalArry.map((item, i) => Object.assign({}, item, this.base64FileArray[i]));
      this._trucksservice.uploadFile(arr3).subscribe(response => {
        var uploadArry=response.data
        this.finalArry=uploadArry
        this.filedata = response
        if(response.Status == "ok"){
          this.showviewedit=true
        }
      },error=>{
        this._toaster.error("Submit Again","Failed");
      });
    }

    onView(data){
        let baseUrl = this.filedata['base_url'];
        let url = baseUrl + data.fileName;   
        window.open(url, '_blank');
    }
    ondelete(data){
      this.finalArry.splice(data,1)
    }
  resetdropoff(){}
  postalCode(){
    console.log(this.inputPostalCode)
    this.showspinner=true
    this.debouncePostalCode(this.inputPostalCode)
    
  }
  submitdropoff(){
    var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        this.dropoff['files']=idArry
        this.dropoff['zipcode']=this.inputPostalCode
        this.dropoff['DropoffDate']=new Date(this.dropoff['DropoffDate']).toLocaleDateString()
        this.dropoff['Truck']=parseInt(this.dropoff['Truck'])
        this.dropoff['Trailer']=parseInt(this.dropoff['Trailer'])
        this.dropoff['zipcode']=parseInt(this.dropoff['zipcode'])
  	    this.dialogRef.close(this.dropoff)
  }
   hidePopup(){
  	this.dialogRef.close(null)
  }
  debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    onPostalCodeSelect(option){
    console.log(option)
    var code=option.postal_code
    this.inputPostalCode=code.split("'")[1]
    this.dropoff['city']=option.city
    this.dropoff['state']=option.state
    this.dropoff['country']=option.country
  }
}
