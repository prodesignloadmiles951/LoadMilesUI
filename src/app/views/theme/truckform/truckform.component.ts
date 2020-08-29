import { Component, OnInit,Input,ViewChild,Output,EventEmitter } from '@angular/core';
import { TrucksFilters } from '../../../model/trucks';
import { TrucksService } from '../../../services/trucks.service';
import { DriversService } from '../../../services/driver.service';
import { DispatcherService } from '../../../services/dispatcher.service';
import { TrailerService } from '../../../services/trailers.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-truckform',
  templateUrl: './truckform.component.html',
  styleUrls: ['./truckform.component.scss'],
  providers: [TrucksService, TrailerService, DispatcherService, DriversService, ToastrService]
})
export class TruckformComponent implements OnInit {
	public trucks: TrucksFilters;
    // public pageFilters: TrucksFilters;
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
    @Output() changed = new EventEmitter();
    @ViewChild(PdfViewerComponent, { static: true}) private pdfComponent: PdfViewerComponent;
    public uploader:FileUploader = new FileUploader({
      url: this.URL, 
      disableMultipart:true
    });

  constructor(private _trucksservice: TrucksService,
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
    console.log(this.datatype)
    if(this.datatype == undefined){
      // this.pageFilters=this.Truckslistdata
      this.mode=true
      this.showAddOption=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode'] 
      this.maintenancedata.push(this.datatype.maintenancedata)
      this.showAddOption=false     
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
    this.changed.emit(this.pageFilters)
  }
   
  addfiles(e){
      var finalArry=e.target.files
      console.log(finalArry)
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
          console.log(this.finalArry)
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
    console.log(obj)
    this.base64FileArray.push(obj)
  }
    onUploadFile(){
      console.log(this.finalArry)
      console.log(this.base64FileArray)
      let arr3 = this.finalArry.map((item, i) => Object.assign({}, item, this.base64FileArray[i]));
      console.log(arr3)
      this._trucksservice.uploadFile(arr3).subscribe(response => {
        console.log(response)
        var uploadArry=response.data
        var fileArray=[]
        for (var i = 0; i < uploadArry.length; i++) {
          var filename=uploadArry[i]
          var filenameSplit=filename.split('_')[1]
          var obj={}
          obj['name']=filenameSplit
          obj['fname']=uploadArry[i]
          fileArray.push(obj)
        }
        this.finalArry=fileArray
        console.log(this.finalArry)
        this.truckfiledata = response
      },error=>{
        this._toaster.error("Submit Again","Failed");
      });

      this.showviewedit=true
    }

    onView(data){
        let baseUrl = this.truckfiledata['base_url'];
        let url = baseUrl + data.fname;   
        window.open(url, '_blank');
    }
    ondelete(data){
      console.log(data)
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
        this._trucksservice.SendForm(Truckslistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Truck Data Submitted","Success", {timeOut: 3000,});
          this.router.navigateByUrl("theme/trucks-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
        this.getData()
       }
   }
   public onFileSelected(event: EventEmitter<File[]>) { 
     var base64FileArray=[]
     console.log(this.uploader.queue)
     var fileSize=this.uploader.queue
     for (var i = 0; i < fileSize.length; i++) {
      let file: File = event[i];
      console.log(file);
      readBase64(file)
        .then(function(data) {
        console.log(data);
        var obj={}
        obj['file']=data
        base64FileArray.push(obj)
        console.log(base64FileArray)
      })
     }


    }
     
}


function readBase64(file): Promise<any> {
    var reader  = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.addEventListener("error", function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    return future;
  }