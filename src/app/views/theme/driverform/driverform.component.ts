import { Component, OnInit, Input } from '@angular/core';
import { DriverFilters } from '../../../model/driver';
import { DriversService } from './../../../services/driver.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driverform',
  templateUrl: './driverform.component.html',
  styleUrls: ['./driverform.component.scss'],
  providers: [DriversService ]
})
export class DriverformComponent implements OnInit {
  // public pageFilters: DriverFilters;
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

  constructor(private _driverService: DriversService,private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {
    console.log(this.datatype)
    if(this.datatype == undefined){
      // this.pageFilters=this.Driverlistdata
      this.mode=true
      this.showAddOption=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']
      this.showAddOption=false     
      this.drugandmedicaldata.push(this.datatype.drugdata)
      this.payratedata.push(this.datatype.payrate)
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

  addfiles(e){
      var finalArry=e.target.files
      if(finalArry.length > 0){
        for (var i = 0; i < finalArry.length; i++) {
          this.finalArry.push(finalArry[i].name)
        }
        sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
        this.finalArry=JSON.parse(sessionStorage.file_upload)
      }
  }
   submit() {
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Driverlistdata:any=this.pageFilters
        Driverlistdata['payrate']=this.payrateinfodata
        Driverlistdata['drugdata']=this.drugdata
        Driverlistdata['companyid']=localStorage.selectedCompany
        this._driverService.SendForm(Driverlistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Driver Data Submitted","Success", {timeOut: 3000,});
         this.router.navigateByUrl("theme/driver-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
       }
     }
}
