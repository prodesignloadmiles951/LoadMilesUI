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
    trailerData={}
    showForm=false

    constructor(private _toaster: ToastrService,
         private _trailersService: TrailerService,
         private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new TrailersFilters();
        this.getData();
    }
    viewData(trailer) {
      this.EditMode = false;
      var trailerObj=trailer
      trailerObj['EditMode']=this.EditMode
      this.trailerData = trailerObj
      this.trailers = new TrailersFilters();
      this.trailers = trailer;
      this.selectedTrailer = trailer.unitNumber;
      this.showForm=true
    }

    editData(trailer) {
      this.EditMode = true;
      var trailerObj=trailer
      trailerObj['EditMode']=this.EditMode
      this.trailerData = trailerObj
      this.trailers = new TrailersFilters();
      this.trailers = trailer;
      this.selectedTrailer = trailer.unitNumber;
      this.showForm=true
  
    }

    hidePopup(){
      this.showForm=false
    }

    // submit() {
    //     this.submitted = true;
    //     this._trailersService.SendForm(this.pageFilters).subscribe(response => {
    //       this.submitted = true;
    //       this._toaster.info("Trailer Data Submitted","Success");
    //       this.router.navigateByUrl("theme/trailers");
    //     },error=>{
    //       this.submitted=false;
    //       this._toaster.error("Submit Agian","Faild");
    //     });
    //    }

    
       getData() {
        this._trailersService.getTrailersData().subscribe(data => {
          this.data = data;
        });
      }
    
      editTrailer(trailer,selectedTrailer) {
        this._trailersService.EditTrailers(trailer).subscribe(response => {
          this._toaster.success(selectedTrailer+" trailer successfully updated", "Success");
        }, error => {
           this._toaster.error("error", "Try Again");
          });
          this.EditMode = false;
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
