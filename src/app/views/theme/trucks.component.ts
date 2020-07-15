import { TrucksFilters } from './../../model/trucks';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrucksService } from '../../services/trucks.service';
import { Router } from '@angular/router';
import { DriversService } from '../../services/driver.service';

@Component({
    selector: 'app-trucks',
    templateUrl: './trucks.component.html',
    providers: [DriversService, TrucksService, ToastrService]
})
export class TrucksComponent implements OnInit {
    public trucks: TrucksFilters;
    pageFilters: TrucksFilters;
    Truckslistdata = new Array<TrucksFilters>();
    submitted: boolean;
    data: any;
    unitNumberdata: any;
    driverdata= [];
    filename: any;
    selectedTruck: any;
    EditMode: boolean;
    finalArry=[]
    uploadFileName=''

    constructor(private _toaster: ToastrService,
        private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private router: Router) {
         }

    ngOnInit() {
        this.getData();
        this.getDriverData()
        this.pageFilters = new TrucksFilters();
        this.pageFilters['geartype']='Select gear'
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
    this.submitted = true;
    this._trucksservice.SendForm(this.pageFilters).subscribe(response => {
      this.submitted = true;
      this._toaster.info("Data Submitted","Success");
      this.router.navigateByUrl("theme/trucks-list");
    },error=>{
      this.submitted=false;
      this._toaster.error("Submit Agian","Faild");
    });
    // console.log(this.pageFilters);
   }

   getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.unitNumberdata = data;
    });
  }

  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.driverdata = data;
          console.log(this.driverdata)
        });
      }

  editTrucks(truck) {
    this._trucksservice.EditTrucks(truck._id).subscribe(response => {
      this._toaster.success("Trucks successfull updated", "Success");
    }, error => {
       this._toaster.error("error", "Try Again");
      });
  }

  deleteTrucks(truck) {
    this._trucksservice.DeleteTrucks(truck._id).subscribe(data => {
    this._toaster.info("Trucks Data Delete", "Success");
    this.getData();
   });
   }
}
