import { DriversService } from './../../services/driver.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit} from '@angular/core';
import { DriverFilters } from '../../model/driver';
import { Router } from '@angular/router';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    providers: [ToastrService, DriversService]
})
export class DriverComponent implements OnInit {
    public pageFilters: DriverFilters;
    Driverlistdata = new Array<DriverFilters>();
    submitted: boolean;
    data=[];
    typeDetails=[];
    filename: any;
    resultDetails=[];
    selectedDriver: any;
    EditMode: boolean;
    drivers: DriverFilters;

    constructor(private _toaster: ToastrService,
        private _driversService: DriversService,
        private router: Router) {}

    ngOnInit(): void {
        this.pageFilters = new DriverFilters();
        //this.getData();
        this.typeDetails=[
      {
          "ID": 0,
          "Name": "% sales"
      },
      {
          "ID": 1,
          "Name": "Per Mile"
      },
      {
          "ID": 2,
          "Name": "Per Hour"
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

    showfiles(e){
      console.log(e.target.files)
      this.filename = e.target.files
    }

    viewData(driver) {
        this.EditMode = false;
        this.drivers = new DriverFilters();
        this.drivers = driver;
        this.selectedDriver = driver.plate;
      }

    submit() {
        this.submitted = true;
        this._driversService.SendForm(this.pageFilters).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Data Submitted","Success");
         this.router.navigateByUrl("theme/driver-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Agian","Faild");
        });
        // console.log(this.pageFilters);
       }


}
