import { Component, OnInit,Input,Inject } from '@angular/core';
import { TrucksFilters } from '../../../model/trucks';
import { TrucksService } from '../../../services/trucks.service';
import { DriversService } from '../../../services/driver.service';
import { DispatcherService } from '../../../services/dispatcher.service';
import { TrailerService } from '../../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-truckform',
  templateUrl: './truckform.component.html',
  styleUrls: ['./truckform.component.scss'],
  providers: [TrucksService, TrailerService, DispatcherService, DriversService, ToastrService]
})
export class TruckformComponent implements OnInit {
	public trucks: TrucksFilters;
    pageFilters={}
    maintenancedata=[];
    Truckslistdata = new Array<TrucksFilters>();
    @Input() datatype;
    mode=false
    finalArry=[]
    driverdata= [];
    Dispatcherdata= [];
    trailerData= [];
    unitNumberdata: any;
    categoryDetails= [];
    truckinfo= [];
    submitted: boolean;
    pageFiltersshow= false;
    maintenanceinfodata={};
    showAddOption=false
    showviewedit=false
    item=''
    itemShow=false
    fileArray=[]
    base64FileArray=[]
    truckfiledata={}
    URL=environment.uploadUrl
    SelectedTruck=true
    showupdate=false
    showsubmit=false
    changeUplaod=true
    editFileList=[]
    btnHide=false
    truckForm: FormGroup;

  constructor(public dialogRef: MatDialogRef < TruckformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _trailersService: TrailerService,
        private _dispatcherService: DispatcherService,
        private _toaster: ToastrService,
        private router: Router
        ) { }

  ngOnInit() {
    this.getDriverData()
    this.getDispatcherData()
    this.getTrailerData()
    console.log(this.data)
    
    if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.SelectedTruck=false
      this.showsubmit=true
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.maintenancedata.push(this.data.maintenancedata)
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
   
    async addfiles(e){
        var finalArry=e.target.files
        this.base64FileArray=[]
        this.fileArray=finalArry
          if(finalArry.length > 0){
            for (let finalArray of finalArry) {
              var objFile={}
              objFile['name']=finalArray['name']
              objFile['size']=finalArray['size']
              objFile['type']=finalArray['type']
              this.finalArry.push(objFile);
              await this.readerFile(this, finalArray);
            }
          sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
          this.finalArry=JSON.parse(sessionStorage.file_upload)
        }
    }

    async readerFile (data, finalArray) {
      const reader = new FileReader();
      reader.onload = await this.handleReaderLoaded.bind(data);
      reader.readAsBinaryString(finalArray);
    }

    handleReaderLoaded(e) {
      this.item = '';
      this.item = btoa(e.target.result);
      var obj = {'file': this.item};
      this.base64FileArray.push(obj);
    }

    onUploadFile(){
      let arr3 = this.finalArry.map((item, i) => Object.assign({}, item, this.base64FileArray[i]));
      this._trucksservice.uploadFile(arr3).subscribe(response => {
        console.log(response)
        var uploadArry=response.data
        this.finalArry=uploadArry
        this.truckfiledata = response
        if(response.Status == "ok"){
          this.showviewedit=true
        }
      },error=>{
        this._toaster.error("Submit Again","Failed");
      });
    }

    onView(data){
        let baseUrl = this.truckfiledata['base_url'];
        let url = baseUrl + data.fileName;   
        window.open(url, '_blank');
    }
    ondelete(data){
      this.finalArry.splice(data,1)
    }

   getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.Dispatcherdata = data;
    });
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
 

  onAdd(eventName) {
    console.log(eventName.key) 
    this.maintenanceinfodata = eventName.key
  }

  onDelete(eventName) {
    console.log(eventName.key)
    this._trucksservice.DeleteTrucks(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  reset(){}
  submit() {
    if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Truckslistdata:any = this.pageFilters
        Truckslistdata['maintenancedata']=this.maintenanceinfodata
        Truckslistdata['companyid']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Truckslistdata['files']=idArry
        if(this.pageFilters['vin'] != undefined && this.pageFilters['vin'] != ""){
          this.btnHide=true
        this._trucksservice.SendForm(Truckslistdata).subscribe(response => {
          this.submitted = true;
          if(response.Status == "error"){
           this.btnHide = false;
            this._toaster.error(response.error,"Failed", {timeOut: 2000,});
          }
            else{
            this._toaster.info("Truck Data Submitted","Success", {timeOut: 3000,});
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
    if(this.data['maintenancedata'] == undefined){
     this.data['maintenancedata']=this.maintenanceinfodata
    }
     console.log(this.data)
     if(this.pageFilters['vin'] != undefined && this.pageFilters['vin'] != ""){
       this.btnHide=true
       this._trucksservice.EditTrucks(this.data).subscribe(res => {
         if(res.Status == "error"){
           this.btnHide = false;
            this._toaster.error(res.error,"Failed", {timeOut: 2000,});
          }else{
         this.btnHide=false
         this._toaster.info("Truck Data Updated successfully","Success", {timeOut: 3000,});
         this.dialogRef.close(res)
       }
       },error=>{
         this._toaster.error("Truck Data Not Updated","Failed", {timeOut: 2000,});
         this.dialogRef.close(null)
       })
     }else{
       this._toaster.error("Enter VIN Details","Failed", {timeOut: 2000,});
     }
   }
   hidePopup(){
     this.dialogRef.close(null)
   }
   
     
}

