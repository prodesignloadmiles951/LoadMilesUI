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
        this.submitted = true;
        var Driverlistdata:any=this.pageFilters
        this._driverService.SendForm(Driverlistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Data Submitted","Success");
         this.router.navigateByUrl("theme/driver-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Agian","Faild");
        });
        console.log(this.pageFilters);
       }

}
