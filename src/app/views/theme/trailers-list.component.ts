import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TrailersFilters } from '../../model/trailers';
import { TrailerService } from '../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TrailerformComponent } from './trailerform/trailerform.component';

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
    trailerList=[
      {'type':0,'name':'Dry Van'},
      {'type':1,'name':'Reefer'},
      {'type':2,'name':'Flat Bed'},
      {'type':3,'name':'Step Deck'},
      {'type':4,'name':'Special'}
    ]

    constructor(private _toaster: ToastrService,
         private _trailersService: TrailerService,
         private router: Router, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.pageFilters = new TrailersFilters();
        this.getData();
    }
    viewData(trailer) {
      var trailerObj=trailer
      trailerObj['EditMode']=false
      let dialogConfig = Object.assign({ width: "900px" },{ data: trailerObj })
      let viewDialogRef = this.dialog.open(TrailerformComponent, dialogConfig);
      viewDialogRef.afterClosed().subscribe((data) => {
        console.log(data)
      })
    }

    editData(trailer) {
      var trailerObj=trailer
      trailerObj['EditMode']=true
      let dialogConfig = Object.assign({ width: "1000px" },{ data: trailerObj })
      let editDialogRef = this.dialog.open(TrailerformComponent, dialogConfig);
      editDialogRef.afterClosed().subscribe((data) => {
        console.log(data)
        if(data == null){}else{
          this.getData()        
        }
      })
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
          for (var i = 0; i < data.length; i++) {
            this.trailerList.map(item => {
              if(item.type == data[i]['trailerType'][0]){
                data[i]['trailerType']=item.name
              }
            })            
          }
          this.data = data;
        });
      }
    
      editTrailer(trailer,selectedTrailer) {
        if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
          trailer['companyid']=localStorage.selectedCompany
          this._trailersService.EditTrailers(trailer).subscribe(response => {
            this._toaster.success(selectedTrailer+" trailer successfully updated", "Success", {timeOut: 3000,});
          }, error => {
             this._toaster.error("error", "Try Again", {timeOut: 2000,});
            });
            this.EditMode = false;
         }
      }
    
      deleteTrailers(trailer) {
        if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
         }else{
          this._trailersService.DeleteTrailers(trailer._id).subscribe(data => {
          this._toaster.info("Trucks Data Deleted", "Success", {timeOut: 3000,});
          this.getData();
         });
         }
       }

       Add() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(TrailerformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()        
          }
    })
      }
}
