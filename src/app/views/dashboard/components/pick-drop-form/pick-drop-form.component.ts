import { Component, OnInit,Inject } from '@angular/core';
import { TrucksService } from '../../../../services/trucks.service';
import { DriversService } from '../../../../services/driver.service';
import { GooglePinSearch } from '../../../../services/google-location.service';
import { TrailerService } from '../../../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickupserviceService } from '../../../../services/pickupservice.service';


@Component({
  selector: 'app-pick-drop-form',
  templateUrl: './pick-drop-form.component.html',
  styleUrls: ['./pick-drop-form.component.scss'],
  providers: [TrucksService, TrailerService, DriversService, ToastrService, PickupserviceService, GooglePinSearch]
})
export class PickDropFormComponent implements OnInit {
 pickup={}
 driverdata= [];
 trailerData= [];
 unitNumberdata: any;
 pickuppopupForm: FormGroup;
 typeDetails=[]
 loadstatusDetails=[]
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
 Driver1=''
 Driver2=''

  constructor(public dialogRef: MatDialogRef < PickDropFormComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _pickup: PickupserviceService,
        private _trailersService: TrailerService,
    private _gPin: GooglePinSearch,
        private _toaster: ToastrService) {
  	console.log(this.data)
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
     if(this.data){
      this.pickup=this.data
      this.inputPostalCode = this.pickup['zipcode']
      if(this.pickup['pickupDate'] != undefined){
      this.pickup['pickupDate'] = new Date(this.pickup['pickupDate']).toISOString().split('T')[0]
      }
      console.log(this.pickup)
      // if(this.pickup['Address'] != undefined ){
      // this.pickup['address1'] = this.pickup['Address'].split(",")[0]
      // this.pickup['address2'] = this.pickup['Address'].split(",")[1]
      // }
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
  
    this.loadstatusDetails = [
      {
        "ID": 0,
        "Name": "Pickup On The Way"
      },
      {
        "ID": 1,
        "Name": "Pickup Delay"
      },
      {
        "ID": 2,
        "Name": "Pickup Ontime"
      },
      {
        "ID": 3,
        "Name": "Loading Delay"
      },
      {
        "ID": 4,
        "Name": "Delay-Loaded"
      }
    ]
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
  getAddress(referPickup){
    this._gPin.getAddress(referPickup).subscribe(data => {
      console.log(data);
      if (data.status === "OK") {
        this.pickup['location'] = data.results[0];
        this.pickup['formatted_address'] = this.pickup['location'].formatted_address;
        console.log(this.pickup);
    } else if (data.status === 'ZERO_RESULTS') {
        this.pickup['location'] = {};
        this.pickup['formatted_address'] = '';
        this._toaster.error("No results found!!", "Failed", { timeOut: 2000, });
    }
    });
   
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

  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.driverdata = data;
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
  postalCode(){
    console.log(this.inputPostalCode)
    this.showspinner=true
    this.debouncePostalCode(this.inputPostalCode)
    
  }
  resetpickup() {}
  submitpickup(){
    var idArry=[]
    for (var i = 0; i < this.finalArry.length; ++i) {
      idArry.push(this.finalArry[i]._id)
    }
    this.pickup['files']=idArry
    this.pickup['zipcode']=this.inputPostalCode;
    sessionStorage.setItem('Pickup', JSON.stringify(this.pickup))
    this.pickup['Truck']=parseInt(this.pickup['Truck'])
    this.pickup['Trailer']=parseInt(this.pickup['Trailer'])
    this.pickup['zipcode']=parseInt(this.pickup['zipcode'])
    let data = {...this.pickup}
    this.dialogRef.close(data)
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
    var codesplit=code.split("'")
    console.log(codesplit)
    if(codesplit.length > 1){
      this.inputPostalCode=codesplit[1]
    }else{
      this.inputPostalCode=code
    }
      this.pickup['city']=option.city
      this.pickup['state']=option.state
      this.pickup['country']=option.country
  }
   selectChangeDriver1(e){
    for (var i = 0; i < this.driverdata.length; i++) {
      if(this.driverdata[i]['firstname']==e){
        this.Driver1=e
        this.pickup['Driver1']=this.driverdata[i]['_id']
        break
      }
    }
    console.log(this.pickup)
  }
  selectChangeDriver2(e){
    for (var i = 0; i < this.driverdata.length; i++) {
      if(this.driverdata[i]['firstname']==e){
        this.Driver2=e
        this.pickup['Driver2']=this.driverdata[i]['_id']
        break
      }
    }
    console.log(this.pickup)
  }

}
