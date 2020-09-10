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
      if(this.data['EditMode']=true){
        this.showupdate=true
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
        this._trucksservice.SendForm(Truckslistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Truck Data Submitted","Success", {timeOut: 3000,});
          this.dialogRef.close(response)
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
       }
   }
   update() {
     this._trucksservice.EditTrucks(this.data).subscribe(res => {
         this._toaster.info("Truck Data Updated successfully","Success", {timeOut: 3000,});
         this.dialogRef.close(null)
         },error=>{
          this._toaster.error("Truck Data Not Updated","Failed", {timeOut: 2000,});
          this.dialogRef.close(null)
     })
   }
   hidePopup(){
     this.dialogRef.close(null)
   }
   
     
}

