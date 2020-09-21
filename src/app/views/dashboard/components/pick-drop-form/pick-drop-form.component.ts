import { Component, OnInit,Inject } from '@angular/core';
import { TrucksService } from '../../../../services/trucks.service';
import { DriversService } from '../../../../services/driver.service';
import { TrailerService } from '../../../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickupserviceService } from '../../../../services/pickupservice.service';


@Component({
  selector: 'app-pick-drop-form',
  templateUrl: './pick-drop-form.component.html',
  styleUrls: ['./pick-drop-form.component.scss'],
  providers: [TrucksService, TrailerService, , DriversService, ToastrService, PickupserviceService]
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

  constructor(public dialogRef: MatDialogRef < PickDropFormComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _pickup: PickupserviceService,
        private _trailersService: TrailerService,
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
  postalCode(){
    console.log(this.inputPostalCode)
    this.showspinner=true
    this.debouncePostalCode(this.inputPostalCode)
    
  }
  resetpickup() {}
  submitpickup(pickup){
    var idArry=[]
    for (var i = 0; i < this.finalArry.length; ++i) {
      idArry.push(this.finalArry[i]._id)
    }
    pickup['files']=idArry
    pickup['zipcode']=this.inputPostalCode
    console.log(pickup)
    sessionStorage.setItem('Pickup', JSON.stringify(pickup))
  	this.dialogRef.close(pickup)
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
    this.pickup['city']=option.city
    this.pickup['state']=option.state
    this.pickup['country']=option.country
  }

}
