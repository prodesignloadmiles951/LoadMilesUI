import { Component, OnInit, Input, Inject } from '@angular/core';
import { TrailersFilters } from '../../../model/trailers';
import { TrailerService } from '../../../services/trailers.service';
import { TrucksService } from '../../../services/trucks.service';
import { DriversService } from '../../../services/driver.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trailerform',
  templateUrl: './trailerform.component.html',
  styleUrls: ['./trailerform.component.scss'],
  providers: [TrailerService, TrucksService, DriversService]
})
export class TrailerformComponent implements OnInit {
	pageFilters={};
	Trailerslistdata = new Array<TrailersFilters>();
	@Input() datatype;
    mode=false
    finalArry=[];
    driverdata= [];
    truckdata= [];
    maintenancedata= [];
    categoryDetails= [];
    pageFiltersshow=false;
    submitted: boolean;
    maintenanceformdata={}
    showAddOption=false
    fileArray=[]
    base64FileArray=[]
    item=''
    filedata={}
    showviewedit=false
    SelectedTrailer= true;
    showupdate=false
    showsubmit=false
    changeUplaod=true
    editFileList=[]
    btnHide=false
    trailerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef < TrailerformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
    private _trailersService: TrailerService, private _trucksservice: TrucksService, private _driverService: DriversService, private _toaster: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getTruckData()
  	console.log(this.data)

    if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.SelectedTrailer=false
      this.showsubmit=true
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.maintenancedata.push(this.data.maintenanceinfo)
      this.changeUplaod=false
      if(this.data['EditMode']){
        this.showupdate=true
        this.editFileList=this.data['files']
      }
    }
     this.pageFiltersshow=true 
     this.categoryDetails=[
      {
          "ID": 0,
          "Name": "Maintenance"
      },
      {
          "ID": 1,
          "Name": "Repairs"
      },
      {
          "ID": 2,
          "Name": "Rebuild"
      }
    ]
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
      console.log(this.finalArry)
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
      console.log(this.finalArry)
    }
    hidePopup(){
     this.dialogRef.close(null)
   }


  onAdd(eventName) {
    console.log(eventName.key) 
    this.maintenanceformdata = eventName.key
  }
  onDelete(eventName) {
    console.log(eventName.key)
    this._trailersService.DeleteTrailers(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
 
  getTruckData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.truckdata = data;
      console.log(this.truckdata)
    });
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
    if(this.data['maintenanceinfo'] == undefined){
     this.data['maintenanceinfo']=this.maintenanceformdata
    }
     console.log(this.data)
     if(this.pageFilters['vin'] != undefined && this.pageFilters['vin'] != ""){
     this.btnHide=true
     this._trailersService.EditTrailers(this.data).subscribe(res => {
       if(res.Status == "error"){
            this._toaster.error(res.error,"Failed", {timeOut: 2000,});
            this.btnHide=false
          }else{
         this._toaster.info("Trailer Data Updated successfully","Success", {timeOut: 3000,});
         this.btnHide=false
         this.dialogRef.close(res)
       }
         },error=>{
          this._toaster.error("Trailer Data Not Updated","Failed", {timeOut: 2000,});
          this.dialogRef.close(null)
     })
     }else{
       this._toaster.error("Enter VIN Details","Failed", {timeOut: 2000,});
     }
   }
  reset(){}
  submit() {
    if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Trailerslistdata:any=this.pageFilters
        Trailerslistdata['maintenanceinfo']=this.maintenanceformdata
        Trailerslistdata['companyid']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Trailerslistdata['files']=idArry
        if(this.pageFilters['vin'] != undefined && this.pageFilters['vin'] != ""){
        this.btnHide=true
        this._trailersService.SendForm(Trailerslistdata).subscribe(response => {
          if(response.Status == "error"){
            this._toaster.error(response.error,"Failed", {timeOut: 2000,});
            this.btnHide=false
          }
            else{
          this.submitted = true;
          this._toaster.info("Trailer Data Submitted","Success", {timeOut: 3000,});
          this.btnHide=false
          this.dialogRef.close(response)
            }


        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
      }else{
        this._toaster.error("Enter VIN Details","Failed", {timeOut: 2000,});
       }
      }
     }
}