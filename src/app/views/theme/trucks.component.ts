import { TrucksFilters } from './../../model/trucks';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrucksService } from '../../services/trucks.service';
import { Router } from '@angular/router';
import { DriversService } from '../../services/driver.service';
import { DispatcherService } from '../../services/Dispatcher.service';
import { TrailerService } from '../../services/trailers.service';

@Component({
    selector: 'app-trucks',
    templateUrl: './trucks.component.html',
    providers: [DriversService, TrucksService, ToastrService, DispatcherService, TrailerService]
})
export class TrucksComponent implements OnInit {
    public trucks: TrucksFilters;
    pageFilters: TrucksFilters;
    Truckslistdata = new Array<TrucksFilters>();
    submitted: boolean;
    data: any;
    maintenancedata=[];
    unitNumberdata: any;
    driverdata= [];
    Dispatcherdata= [];
    trailerData= [];
    filename: any;
    categoryDetails= [];
    selectedTruck: any;
    EditMode: boolean;
    finalArry=[]
    uploadFileName=''

    constructor(private _toaster: ToastrService,
        private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _trailersService: TrailerService,
        private _dispatcherService: DispatcherService,
        private router: Router) {
         }

    ngOnInit() {
        this.getData();
        this.getDriverData()
        this.getDispatcherData()
        this.getTrailerData()
        this.pageFilters = new TrucksFilters();
        this.pageFilters['geartype']='Select gear'

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
          "Name": "Replacement"
      }
    ]
  }
  viewData(truck) {
    this.EditMode = false;
    this.trucks = new TrucksFilters();
    this.trucks = truck;
    this.selectedTruck = truck.plate;
  }
  showfiles(e){
      console.log(e.target.files)
      this.finalArry=[]
      this.filename = e.target.files
      this._getFileData()
  }

  _getFileData(){
    for (var i = 0; i < this.filename.length; i++) {
       this.uploadFileName=this.filename[i].name
       const reader = new FileReader();
       reader.onload = this.handleReaderLoaded.bind(this);
       reader.readAsBinaryString(this.filename[i]);
    }
   }

   handleReaderLoaded(e) {
     console.log(e)
     var binarydata = btoa(e.target.result);
     // var item = 'data:image/png;base64,' + binarydata;
     var obj={}
     obj['name']=this.uploadFileName
     obj['data']=binarydata
     // this.finalArry.push(obj)
     console.log(obj)
   }
    
  submit() {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
          this.submitted = true;
          this.pageFilters['companyid']=localStorage.selectedCompany
          this._trucksservice.SendForm(this.pageFilters).subscribe(response => {
            this.submitted = true;
            this._toaster.info("Truck Data Submitted","Success");
            this.router.navigateByUrl("theme/trucks-list");
          },error=>{
            this.submitted=false;
            this._toaster.error("Submit Again","Failed");
          });
          this.getData()
       }
   }

   getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.unitNumberdata = data;
    });
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

  editTrucks(truck) {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
          truck['companyid']=localStorage.selectedCompany
          this._trucksservice.EditTrucks(truck).subscribe(response => {
            this._toaster.success("Trucks successfull updated", "Success");
          }, error => {
             this._toaster.error("error", "Try Again");
            });
       }
  }

  deleteTrucks(truck) {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
          this._trucksservice.DeleteTrucks(truck._id).subscribe(data => {
          this._toaster.info("Trucks Data Delete", "Success");
          this.getData();
         });
       }
   }
}
