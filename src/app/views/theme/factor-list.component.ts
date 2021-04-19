import { FactorService } from './../../services/factor.service';
import { FactorComponent } from './factor.component';
import { Component, OnInit} from '@angular/core';
import { FactorFilters } from '../../model/factor';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-factor-list',
    templateUrl: './factor-list.component.html',
    providers: [FactorService]
})
export class FactorlistComponent implements OnInit {
    public pageFilters: FactorFilters;
    Factorlistdata = new Array<FactorFilters>();
    submitted: boolean;
    selectedFactor: any;
    factordata: [];
    data: any;
    EditMode: boolean;
    Isusersloading: boolean;
    SearchText: any;
    selectedTrailer: any;

    constructor(private _toaster: ToastrService,
        private router: Router, private _factorService: FactorService,
        public dialog: MatDialog) { }

    ngOnInit(): void {
      this.Isusersloading = false;
        this.pageFilters = new FactorFilters();
        this.getData();
    }

    viewData(factor) {
      var factorObj=factor
      factorObj['EditMode']=false;
      let dialogConfig = Object.assign({ width: "1000px" },{ data: factorObj })
      let viewDialogRef = this.dialog.open(FactorComponent, dialogConfig);
      viewDialogRef.afterClosed().subscribe((data) => {
        console.log(data)
      })
  }
  editData(factor) {
    var factorObj=factor
    factorObj['EditMode']=true
    let dialogConfig = Object.assign({ width: "1000px" },{ data: factorObj })
    let editDialogRef = this.dialog.open(FactorComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if(data == null){}else{
        this.getData()        
      }
    })
}

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(FactorComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()
          }
        })
      }
      getData() {
        this._factorService.getFactorData().subscribe(data => {
          this.factordata = data;
        });
    }
}
