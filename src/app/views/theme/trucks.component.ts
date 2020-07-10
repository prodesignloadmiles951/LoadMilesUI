import { TrucksFilters } from './../../model/trucks';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrucksService } from '../../services/trucks.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-trucks',
    templateUrl: './trucks.component.html',
    providers: [TrucksService, ToastrService]
})
export class TrucksComponent implements OnInit {
    public trucks: TrucksFilters;
    pageFilters: TrucksFilters;
    Truckslistdata = new Array<TrucksFilters>();
    submitted: boolean;
    data: any;
    selectedTruck: any;
    EditMode: boolean;

    constructor(private _toaster: ToastrService,
        private _trucksservice: TrucksService,
        private router: Router) {
         }

    ngOnInit() {
        this.getData();
        this.pageFilters = new TrucksFilters();
        this.pageFilters['geartype']='Select gear'
  }
  viewData(truck) {
    this.EditMode = false;
    this.trucks = new TrucksFilters();
    this.trucks = truck;
    this.selectedTruck = truck.plate;
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
      this.data = data;
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
