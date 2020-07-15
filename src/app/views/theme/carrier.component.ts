import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarrierService } from './../../services/carrier.service';
import { CarrierFilters } from '../../model/carrier';
import { Component, OnInit} from '@angular/core';



@Component({
    selector: 'app-carrier',
    templateUrl: './carrier.component.html',
    providers: [ToastrService, CarrierService]
})
export class CarrierComponent implements OnInit {
    public pageFilters: CarrierFilters;
    Carrierlistdata = new Array<CarrierFilters>();
    submitted: boolean;
    typeDetails=[];
    data=[];
    filename: any;

    constructor(private _toaster: ToastrService,
        private _carrierservice: CarrierService,
        private router: Router ){

        }
    ngOnInit(): void {
        this.pageFilters = new CarrierFilters();
         this.typeDetails=[
      {
          "ID": 0,
          "Name": "Dispatcher"
      },
      {
          "ID": 1,
          "Name": "Driver"
      },
      {
          "ID": 2,
          "Name": "Owner"
      }
    ]
    }

    showfiles(e){
      console.log(e.target.files)
      this.filename = e.target.files
    }


    //  FileDetails() {

    //     // GET THE FILE INPUT.
    //     var fi = document.getElementById('file');

    //     // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    //     if (fi.files.length > 0) {

    //         // THE TOTAL FILE COUNT.
    //         document.getElementById('fp').innerHTML =
    //             'Total Files: <b>' + fi.files.length + '</b></br >';

    //         // RUN A LOOP TO CHECK EACH SELECTED FILE.
    //         for (var i = 0; i <= fi.files.length - 1; i++) {

    //             var fname = fi.files.item(i).name;      // THE NAME OF THE FILE.
    //             var fsize = fi.files.item(i).size;      // THE SIZE OF THE FILE.

    //             // SHOW THE EXTRACTED DETAILS OF THE FILE.
    //             document.getElementById('fp').innerHTML =
    //                 document.getElementById('fp').innerHTML + '<br /> ' + fname
    //                     // fname + ' (<b>' + fsize + '</b> bytes)';
    //         }
    //     }
    //     else { 
    //         alert('Please select a file.') 
    //     }
    // }

    submit() {
        this.submitted = true;
        this._carrierservice.SendForm(this.pageFilters).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Data Submitted","Success");
          this.router.navigateByUrl("theme/carrier-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Agian","Faild");
        });
        // console.log(this.pageFilters);
       }
}

 