import { Component, OnInit, Input, Inject } from '@angular/core';
import { DriverFilters } from '../../../model/driver';
import { DriversService } from './../../../services/driver.service';
import { TrailerService } from '../../../services/trailers.service';
import { TrucksService } from '../../../services/trucks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-driverform',
  templateUrl: './driverform.component.html',
  styleUrls: ['./driverform.component.scss'],
  providers: [DriversService, TrucksService, TrailerService ]
})
export class DriverformComponent implements OnInit {
  pageFilters={};
  Driverlistdata = new Array<DriverFilters>();
  payratedata=[];
  drugandmedicaldata=[]; 
  @Input() datatype;
  mode=false
  finalArry=[];
  typeDetails= [];
  resultDetails= [];
  showAddOption=false
  submitted: boolean;
  pageFiltersshow=false;
  payrateinfodata={};
  drugdata={};
  fileArray=[]
  base64FileArray=[]
  item=''
  filedata={}
  showviewedit=false
  selectedDriver=true
  showupdate=false
  showsubmit=false
  changeUplaod=true
  editFileList=[]
  btnHide=false
  DriverlistdataId
  driverForm: FormGroup;

  constructor(public dialogRef: MatDialogRef < DriverformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
    private _driverService: DriversService,private _trailersService: TrailerService, private _trucksservice: TrucksService, private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {

    if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedDriver=false
      this.showsubmit=true
      this.pageFilters['address']={}
      this.pageFilters['account']={}
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.drugandmedicaldata.push(this.data.drugData)
      this.payratedata.push(this.data.payRate)
      this.changeUplaod=false
      if(this.data['EditMode']){
        this.showupdate=true
        this.editFileList=this.data['files']
      }
    }


    this.pageFiltersshow=true;
    this.typeDetails=[
      {
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
      }
    ]
    this.resultDetails=[
      {
          "ID": 0,
          "Name": "Pass"
      },
      {
          "ID": 1,
          "Name": "Fail"
      }
    ]

    if(this.data['files'] != undefined){
      this._trailersService.getFileList().subscribe(response => {
          console.log(response)
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

  onpayrateAdd(eventName) {
    console.log(eventName.key) 
    this.payrateinfodata = eventName.key
  }

  onpayrateDelete(eventName) {
    console.log(eventName.key)
    this._driverService.DeleteDrivers(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  onpayrateEdit(eventName){
    this.payrateinfodata = eventName.key
    console.log(this.payrateinfodata)
  }

  ondrugAdd(eventName) {
      console.log(eventName.key) 
    this.drugdata = eventName.key
  }
  ondrugDelete(eventName) {
    console.log(eventName.key)
    this._driverService.DeleteDrivers(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  ondrugEdit(eventName){
     console.log(eventName.key) 
    this.drugdata = eventName.key
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
    if(this.data['payRate'] == undefined){
     this.data['payRate']=this.payrateinfodata
    }
    if(this.data['drugData'] == undefined){
     this.data['drugData']=this.drugdata
    }
     console.log(this.data)
          this.btnHide=true
              delete this.data['createdAt']
              delete this.data['updatedAt']
              delete this.data['EditMode']
              this.data['ssn'] = JSON.stringify(this.data['ssn'])
              this.data['cellPhone'] = JSON.stringify(this.data['cellPhone'])

     this._driverService.EditDrivers(this.data,this.data['_id']).subscribe(res => {
       if(res.Status == "error"){
                  this._toaster.error(res.error,"Failed", {timeOut: 2000,});
                  this.btnHide=false
                }else{
         this._toaster.info("Driver Data Updated successfully","Success", {timeOut: 3000,});
         this.btnHide=false
         this.dialogRef.close(res)
       }
         },error=>{
          this._toaster.error("Driver Data Not Updated","Failed", {timeOut: 2000,});
          this.dialogRef.close(null)
     })
  
   }
   reset(){}
   submit() {
           
              this.submitted = true;
              var Driverlistdata:any=this.pageFilters
              Driverlistdata['payRate']=this.payrateinfodata
              Driverlistdata['drugData']=this.drugdata
              Driverlistdata['companyid']=localStorage.selectedCompany
              var idArry=[]
              for (var i = 0; i < this.finalArry.length; ++i) {
                idArry.push(this.finalArry[i]._id)
              }
              Driverlistdata['files']=idArry
                this.btnHide=true
                this.pageFilters['companyId'] = localStorage.getItem('selectedCompany')
                console.log(this.pageFilters['companyId'])

              var addobj={}
              addobj['line']=Driverlistdata['address']['line']
              addobj['line1']=Driverlistdata['address']['line1']
              addobj['city']=Driverlistdata['address']['city']
              addobj['state']=Driverlistdata['address']['state']
              addobj['zip']=Driverlistdata['address']['zip']
              addobj['country']=Driverlistdata['address']['country']
              delete Driverlistdata['line']
              delete Driverlistdata['line1']
              delete Driverlistdata['city']
              delete Driverlistdata['state']
              delete Driverlistdata['zip']
              delete Driverlistdata['country']
              Driverlistdata['address']=addobj

              var account={}
              account['bankname']=Driverlistdata['account']['bankname']
              account['accountnumber']=Driverlistdata['account']['accountnumber']
              account['acctype']=Driverlistdata['account']['acctype']

              delete Driverlistdata['accountnumber']
              delete Driverlistdata['bankname']
              delete Driverlistdata['acctype']
              delete Driverlistdata['companyid']

              Driverlistdata['account']= account
              Driverlistdata['cellPhone'] = JSON.stringify(Driverlistdata['cellPhone'])
              Driverlistdata['ssn'] = JSON.stringify(Driverlistdata['ssn'])
              Driverlistdata['_id'] = this.DriverlistdataId

              this._driverService.EditDrivers(Driverlistdata, Driverlistdata['_id']).subscribe(response => {
                if(response.Status == "error"){
                  this._toaster.error(response.error,"Failed", {timeOut: 2000,});
                  this.btnHide=false
                }else{
                this.submitted = true;
                this._toaster.info("Driver Data Submitted","Success", {timeOut: 3000,});
                this.btnHide=false
                this.dialogRef.close(response)
              }
              },error=>{
                this.submitted=true;
                this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
              });
           
           }
    submitpartI(){
      this.submitted = true;
              var Driverlistdata:any=this.pageFilters
              Driverlistdata['payRate']=this.payrateinfodata
              Driverlistdata['drugData']=this.drugdata
              Driverlistdata['companyid']=localStorage.selectedCompany
              var idArry=[]
              for (var i = 0; i < this.finalArry.length; ++i) {
                idArry.push(this.finalArry[i]._id)
              }
              Driverlistdata['files']=idArry
                this.pageFilters['companyId'] = localStorage.getItem('selectedCompany')
                console.log(this.pageFilters['companyId'])

              var addobj={}
              addobj['line']=Driverlistdata['address']['line']
              addobj['line1']=Driverlistdata['address']['line1']
              addobj['city']=Driverlistdata['address']['city']
              addobj['state']=Driverlistdata['address']['state']
              addobj['zip']=Driverlistdata['address']['zip']
              addobj['country']=Driverlistdata['address']['country']
              delete Driverlistdata['line']
              delete Driverlistdata['line1']
              delete Driverlistdata['city']
              delete Driverlistdata['state']
              delete Driverlistdata['zip']
              delete Driverlistdata['country']
              Driverlistdata['address']=addobj

              var account={}
              account['bankname']=Driverlistdata['account']['bankname']
              account['accountnumber']=Driverlistdata['account']['accountnumber']
              account['acctype']=Driverlistdata['account']['acctype']

              delete Driverlistdata['accountnumber']
              delete Driverlistdata['bankname']
              delete Driverlistdata['acctype']
              delete Driverlistdata['companyid']

              Driverlistdata['account']= account
              Driverlistdata['cellPhone'] = JSON.stringify(Driverlistdata['cellPhone'])
              if(this.pageFilters['fullName'] != undefined && this.pageFilters['fullName'] != ""){
                if(this.pageFilters['email'] != undefined && this.pageFilters['email'] != ""){
                    if(this.pageFilters['cellPhone'] != undefined && this.pageFilters['cellPhone'] != ""){
                      if(this.pageFilters['emergencyPhone'] != undefined && this.pageFilters['emergencyPhone'] != ""){
                          this.btnHide=true
                          this._driverService.SendForm(Driverlistdata).subscribe(response => {
                if(response.Status == "error"){
                  this._toaster.error(response.error,"Failed", {timeOut: 2000,});
                  this.btnHide=false
                }else{
                this.submitted = true;
                this._toaster.info("Driver Data Submitted","Success", {timeOut: 3000,});
                this.btnHide=false
                this.DriverlistdataId = response['result']['_id']
                console.log(this.DriverlistdataId)
              }
              },error=>{
                this.submitted=false;
                this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
              });
                      }else{
        this._toaster.error("Enter Emergency phone details","Failed", {timeOut: 2000,});
       }
                    }else{
        this._toaster.error("Enter Cellphone details","Failed", {timeOut: 2000,});
       }
                }else{
        this._toaster.error("Enter Email details","Failed", {timeOut: 2000,});
       }
              }else{
        this._toaster.error("Enter Fullname details","Failed", {timeOut: 2000,});
       }




              
    }
    hidePopup(){
     this.dialogRef.close(null)
   }
}
