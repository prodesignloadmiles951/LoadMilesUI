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


    submit() {
      if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
          this.submitted = true;
          this.pageFilters['companyid']=localStorage.selectedCompany
          this._carrierservice.SendForm(this.pageFilters).subscribe(response => {
            this.submitted = true;
            this._toaster.info("Data Submitted","Success");
            this.router.navigateByUrl("theme/carrier-list");
          },error=>{
            this.submitted=false;
            this._toaster.error("Submit Agian","Faild");
          });
         }
       }
}

 