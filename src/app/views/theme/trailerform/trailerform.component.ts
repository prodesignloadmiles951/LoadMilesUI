import { Component, OnInit, Input } from '@angular/core';
import { TrailersFilters } from '../../../model/trailers';
import { TrailerService } from '../../../services/trailers.service';
import { TrucksService } from '../../../services/trucks.service';
import { DriversService } from '../../../services/driver.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(private _trailersService: TrailerService, private _trucksservice: TrucksService, private _driverService: DriversService, private _toaster: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getDriverData()
    this.getTruckData()
  	console.log(this.datatype)
    if(this.datatype == undefined){
      this.pageFilters=this.Trailerslistdata
      this.mode=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']      
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
      if(finalArry.length > 0){
        for (var i = 0; i < finalArry.length; i++) {
          this.finalArry.push(finalArry[i].name)
        }
        sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
        this.finalArry=JSON.parse(sessionStorage.file_upload)
      }
  }
  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.driverdata = data;
          console.log(this.driverdata)
        });
      }
  getTruckData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.truckdata = data;
      console.log(this.truckdata)
    });
  }
  submit() {
        this.submitted = true;
        var Trailerslistdata:any=this.pageFilters
        this._trailersService.SendForm(Trailerslistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Data Submitted","Success");
         this.router.navigateByUrl("theme/trailers-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Agian","Faild");
        });
        // console.log(this.pageFilters);
       }

}