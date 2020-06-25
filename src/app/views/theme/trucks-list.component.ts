import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrucksService } from '../../services/trucks.service';
import { CompanyService } from '../../services/company.service';
import { CompanyFilters } from './../../model/companydetails';
import { TrucksFilters } from '../../model/trucks';
import {Router} from '@angular/router';

@Component({
    selector: 'app-trucks-list',
    templateUrl: './trucks-list.component.html',
    providers: [TrucksService, ToastrService]
})
export class TruckslistComponent implements OnInit {
  public company: CompanyFilters;
  public trucks: TrucksFilters;
    pageFilters: TrucksFilters;
    Truckslistdata = new Array<TrucksFilters>();
    submitted: boolean;
    data: any;
    selectedTruck: any;
    selectedCompany: any;
    EditMode: boolean;
 
    constructor(private _toaster: ToastrService,
      private _trucksservice: TrucksService,
      private router: Router) {
         }

    ngOnInit() {
      this.getData();
  }
  viewData(truck) {
    this.EditMode = false;
    this.trucks = new TrucksFilters();
    this.trucks = truck;
    this.selectedTruck = truck.plate;
  }
  getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.data = data;
    });
  }

  editData(truck) {
    this.EditMode = true;
    this.trucks = new TrucksFilters();
    this.trucks = truck;
    this.selectedTruck = truck.companyname;

  }

  editTrucks(trucks) {
    this._trucksservice.EditTrucks(trucks).subscribe(response => {
      this._toaster.success("Trucks successfully updated", "Success");
    }, error => {
       this._toaster.error("error", "Try Again");
      });
      this.EditMode = false;
  }

  Add() {
    this.router.navigateByUrl('/theme/trucks');
  }

  deleteTrucks(truck) {
    this._trucksservice.DeleteTrucks(truck._id).subscribe(data => {
    this._toaster.info("Trucks Data Delete", "Success");
    this.getData();
   });
   }
}
 