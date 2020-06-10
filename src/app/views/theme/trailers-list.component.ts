import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TrailersFilters } from '../../model/trailers';
import { TrailerService } from '../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-trailers-list',
    templateUrl: './trailers-list.component.html',
    providers: [TrailerService, ToastrService, ]
})
export class TrailerslistComponent implements OnInit {
  public trailers: TrailersFilters;
    pageFilters: TrailersFilters;
    Trailerslistdata = new Array<TrailersFilters>();
    model: any = {};
    submitted: boolean;
    data: any;
    selectedTrailer: any;
    EditMode: boolean;

    constructor(private _toaster: ToastrService,
         private _trailersService: TrailerService,
         private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new TrailersFilters();
        this.getData();
    }
    viewData(trailer) {
      this.EditMode = false;
      this.trailers = new TrailersFilters();
      this.trailers = trailer;
      this.selectedTrailer = trailer.plate;
    }

    submit() {
        this.submitted = true;
        this._trailersService.SendForm(this.pageFilters).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Data Submitted","Success");
          this.router.navigateByUrl("theme/trailers");
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

       Add() {
        this.router.navigateByUrl('/theme/trailers');
      }
}
