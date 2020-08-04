import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TrailersFilters } from '../../model/trailers';
import { TrailerService } from '../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TrucksService } from '../../services/trucks.service';

@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    providers: [TrailerService, ToastrService, TrucksService]
})
export class TrailersComponent implements OnInit {
  public trailers: TrailersFilters;
    pageFilters: TrailersFilters;
    Trailerslistdata = new Array<TrailersFilters>();
    model: any = {};
    submitted: boolean;
    data: any;
    truckData: any;
    filename: any;
    selectedTrailer: any;
    EditMode: boolean;

    constructor(private _toaster: ToastrService,
         private _trailersService: TrailerService,
         private _trucksservice: TrucksService,
         private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new TrailersFilters();
        this.getData();
        this.getTruckData();
    }
    viewData(trailer) {
      this.EditMode = false;
      this.trailers = new TrailersFilters();
      this.trailers = trailer;
      this.selectedTrailer = trailer.plate;
    }
    showfiles(e){
      console.log(e.target.files)
      this.filename = e.target.files
    }
    submit() {
        this.submitted = true;
        this._trailersService.SendForm(this.pageFilters).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Data Submitted","Success");
         this.router.navigateByUrl("theme/trailers-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Agian","Faild");
        });
        // console.log(this.pageFilters);
       }
    
       getData() {
        this._trailersService.getTrailersData().subscribe(data => {
          this.data = data;
        });
      }
       getTruckData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.truckData = data;
    });
  }
    
      editTrailers(trailer) {
        this._trailersService.EditTrailers(trailer._id).subscribe(response => {
          this._toaster.success("Trucks successfull updated", "Success");
        }, error => {
           this._toaster.error("error", "Try Again");
          });
      }
    
      deleteTrailers(trailer) {
        this._trailersService.DeleteTrailers(trailer._id).subscribe(data => {
        this._toaster.info("Trucks Data Delete", "Success");
        this.getData();
       });
       }
}
