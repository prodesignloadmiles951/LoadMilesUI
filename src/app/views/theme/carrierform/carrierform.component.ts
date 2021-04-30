import { Component, OnInit, Input, Inject } from '@angular/core';
import { CarrierService } from './../../../services/carrier.service';
import { TrucksService } from '../../../services/trucks.service';
import { TrailerService } from '../../../services/trailers.service';
import { CarrierFilters } from '../../../model/carrier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DriversService } from '../../../services/driver.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-carrierform',
  templateUrl: './carrierform.component.html',
  styleUrls: ['./carrierform.component.scss'],
  providers: [CarrierService,DriversService, TrucksService, TrailerService]
})
export class CarrierformComponent implements OnInit {
	public pageFilters={};
    Carrierlistdata = new Array<CarrierFilters>();
    contactdata=[];
    payratedata=[];
    driversafetydata=[];
    trucksafetydata=[];
    drugmedicaldata=[];
    carrierForm: FormGroup;
    @Input() datatype;
    mode=false
    finalArry=[]
    typeDetails= [ {
          "ID": 0,
          "Name": "Carrier"
      },
      {
          "ID": 1,
          "Name": "Driver"
      },
      {
          "ID": 2,
          "Name": "Owner"
      }];
    trucktypeDetails= [{
          "ID": 0,
          "Name": "Truck"
      },
      {
          "ID": 1,
          "Name": "Trailer"
      }];
    paytypeDetails= [{
          "ID": 0,
          "Name": "Per Hour"
      },
      {
          "ID": 1,
          "Name": "Per Mile"
      },
      {
          "ID": 2,
          "Name": "Percentage(%)"
      }];
    resultDetails= [
    {
          "ID": 0,
          "Name": "Pass"
      },
      {
          "ID": 1,
          "Name": "Fail"
      }
    ];
    statusDetails=[{
          "ID": 0,
          "Name": "Active"
      },
      {
          "ID": 1,
          "Name": "Inactive"
      }];
    pageFiltersshow=false;
    submitted: boolean;
    contactinfodata={};
    payrateinfodata={};
    driversafetyAddObj={};
    trucksafetyAddObj={};
    drugdata={};
    driverdata= [];
    hazmatDetails=[ {
          "ID": 0,
          "Name": "Yes"
      },
      {
          "ID": 1,
          "Name": "No"
      }];
    showAddOption=false
    medicalcardexpiration=undefined
    cdlexpirytate=undefined
    fileArray=[]
    base64FileArray=[]
    item=''
    filedata={}
    showviewedit=false
    selectedCarrier=true
    showupdate=false
    showsubmit=false
    changeUplaod=true
    editFileList=[]
    btnHide=false
    driversafetydetails=undefined

  constructor(public dialogRef: MatDialogRef < CarrierformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _carrierService: CarrierService,private _trailersService: TrailerService, private _trucksservice: TrucksService, private _driverService: DriversService,private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {

    if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedCarrier=false
      this.showsubmit=true
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.contactdata.push(this.data.contactinfo)
      this.payratedata.push(this.data.payrate)
      this.drugmedicaldata.push(this.data.drugdata)
      this.trucksafetydata.push(this.data.trucksafetyAddObj)
      this.driversafetydata.push(this.data.driversafetyAddObj)
      this.medicalcardexpiration= new Date(this.data['medicalcardexpiration'])
      this.cdlexpirytate= new Date(this.data['cdlexpirytate'])
      this.changeUplaod=false
      if(this.data['hazmatcertified']){
        this.pageFilters['hazmatcertified']=0
      }else{
        this.pageFilters['hazmatcertified']=1
      }
      if(this.data['EditMode']){
        this.showupdate=true
        this.editFileList=this.data['files']
      }
    }

    this.pageFiltersshow=true;
    this.getDriverData()
    

     if(this.data['files'] != undefined){
      this._trailersService.getFileList().subscribe(response => {
          this.editFileList=[]
          var fileArray=response.data
          fileArray.forEach(element => {
            var arr=this.data['files']
            for (var i = 0; i < arr.length; i++) {
              if(element['_id'] == arr[i]){
                this.editFileList.push(element)
              }            
            }
          });        
        },error=>{
          console.log(error)
        });
    }
    
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
          for (var i = 0; i < this.driverdata.length; i++) {
            this.driverdata[i]['ID'] == i
          }
        });
      }

  onAdd(eventName) {
    console.log(eventName.key) 
    this.contactinfodata = eventName.key
  }
  onEdit(eventName){
    this.contactinfodata = eventName.key
  }
  onDelete(eventName) {
    console.log(eventName.key)
    this._carrierService.DeleteCarrier(eventName.key).subscribe(data => {
      console.log(data)
    });
  }

  ontrucksafetyAdd(eventName) {
      this.trucksafetyAddObj=eventName.key
      var truckplateexpiry = new Date(this.trucksafetyAddObj['plateexpiry']).toLocaleDateString()
      var truckinsuranceexpiry = new Date(this.trucksafetyAddObj['insuranceexpiry']).toLocaleDateString()
      this.trucksafetyAddObj['plateexpiry'] = truckplateexpiry
      this.trucksafetyAddObj['insuranceexpiry'] = truckinsuranceexpiry
      delete this.trucksafetyAddObj['__KEY__']
  }
  ontrucksafetyEdit(eventName){
    console.log(eventName)
  }
  ontrucksafetyDelete(eventName){
    console.log(eventName)
  }

  ondriversafetyAdd(eventName){
      this.driversafetyAddObj=eventName.key
      var drivercdlexpiry = new Date(this.driversafetyAddObj['cdlexpirydate']).toLocaleDateString()
      var medicalcardexpiry = new Date(this.driversafetyAddObj['medicalcardexpiration']).toLocaleDateString()
      this.driversafetyAddObj['cdlexpirydate'] = drivercdlexpiry
      this.driversafetyAddObj['medicalcardexpiration'] = medicalcardexpiry
      delete this.driversafetyAddObj['__KEY__']
  }
  ondriversafetyEdit(eventName){
    console.log(eventName)
  }
  ondriversafetyDelete(eventName){
    console.log(eventName)
  }

  onpayrateAdd(eventName) {
      console.log(eventName.key) 
    this.payrateinfodata = eventName.key
  }
  onpayrateEdit(eventName){
    this.payrateinfodata = eventName.key
  }
  onpayrateDelete(eventName) {
    this._carrierService.DeleteCarrier(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  ondrugAdd(eventName) {
    this.drugdata = eventName.key
  }
  ondrugEdit(eventName){
    this.drugdata = eventName.key
  }
  ondrugDelete(eventName) {
    this._carrierService.DeleteCarrier(eventName.key).subscribe(data => {
      console.log(data)
    });
  }

  onmedcardexpdateselect(event) {
    var medexpdate = new Date(event.target.value).getTime()
    this.pageFilters['medicalcardexpiration'] = medexpdate
  }
  oncdlexpdateselect(event) {
    var cdlexpdate = new Date(event.target.value).getTime()
    this.pageFilters['cdlexpirytate'] = cdlexpdate
  }
  hidePopup(){
     this.dialogRef.close(null)
   }
   update() {
     if(this.editFileList.length > 0){
      var array = this.finalArry.concat(this.editFileList);
      var idArry=[]
        for (var i = 0; i < array.length; ++i) {
          idArry.push(array[i]._id)
        }
      this.data['files']=idArry
    }
    if(this.finalArry.length > 0 && this.editFileList.length == 0){
     var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
     this.data['files']=idArry
    }
    if(this.data['payrate'] == undefined){
     this.data['payrate']=this.payrateinfodata
    }
    if(this.data['drugdata'] == undefined){
     this.data['drugdata']=this.drugdata
    }
    if(this.data['trucksafetyAddObj'] == undefined){
     this.data['trucksafetyAddObj']=this.trucksafetyAddObj
    }
    if(this.data['driversafetyAddObj'] == undefined){
     this.data['driversafetyAddObj']=this.driversafetyAddObj
    }
    if(this.data['contactinfo'] == undefined){
     this.data['contactinfo']=this.contactinfodata
    }
     console.log(this.data)
     if(this.pageFilters['ssn'] != undefined && this.pageFilters['ssn'] != ""){
          this.btnHide=true
     this._carrierService.EditCarrier(this.data, this.data['_id']).subscribe(res => {
         this._toaster.info("Carrier Data Updated successfully","Success", {timeOut: 3000,});
         this.btnHide=false
         this.dialogRef.close(res)
         },error=>{
          this._toaster.error("Carrier Data Not Updated","Failed", {timeOut: 2000,});
          this.dialogRef.close(null)
     })
   }else{
     this._toaster.error("Enter SSN Details","Failed", {timeOut: 2000,});
   }
   }
   reset(){}
   submit() {
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Carrierlistdata:any=this.pageFilters
        Carrierlistdata['contactinfo']=this.contactinfodata
        Carrierlistdata['payrate']=this.payrateinfodata
        Carrierlistdata['drugdata']=this.drugdata
        Carrierlistdata['driversafetyAddObj']=this.driversafetyAddObj
        Carrierlistdata['trucksafetyAddObj']=this.trucksafetyAddObj
        Carrierlistdata['companyid']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Carrierlistdata['files']=idArry
        if(this.pageFilters['ssn'] != undefined && this.pageFilters['ssn'] != ""){
          this.btnHide=true
        this._carrierService.EditCarrier(Carrierlistdata, Carrierlistdata['_id']).subscribe(response => {
          if(response.Status == "error"){
                  this._toaster.error(response.error,"Failed", {timeOut: 2000,});
                  this.btnHide=false
                }else{
          this.submitted = true;
          this._toaster.info("Carrierform Data Submitted","Success", {timeOut: 3000,});
          this.btnHide=false
         this.dialogRef.close(response)
       }
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
      }else{
     this._toaster.error("Enter SSN Details","Failed", {timeOut: 2000,});
   }
        console.log(this.pageFilters);
       }
     }
     submitpart1(){
            if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Carrierlistdata:any=this.pageFilters
        Carrierlistdata['companyId']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Carrierlistdata['files']=idArry
        if(this.pageFilters['companyname'] != undefined && this.pageFilters['companyname'] != ""){
          if(this.pageFilters['cellphone'] != undefined && this.pageFilters['cellphone'] != ""){
            if(this.pageFilters['cemergencyphone'] != undefined && this.pageFilters['cemergencyphone'] != ""){
               this.btnHide=true
        this._carrierService.SendForm(Carrierlistdata).subscribe(response => {
          if(response.Status == "error"){
                  this._toaster.error(response.error,"Failed", {timeOut: 2000,});
                  this.btnHide=false
                }else{
          this.submitted = true;
          this._toaster.info("Carrierform Data Submitted","Success", {timeOut: 3000,});
          this.btnHide=false
         this.dialogRef.close(response)
       }
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
            }else{
     this._toaster.error("Enter Emergency phone Details","Failed", {timeOut: 2000,});
   }
          }else{
     this._toaster.error("Enter Cellphone Details","Failed", {timeOut: 2000,});
   }

         
      }else{
     this._toaster.error("Enter companyname Details","Failed", {timeOut: 2000,});
   }
        console.log(this.pageFilters);
       }
     }

}
