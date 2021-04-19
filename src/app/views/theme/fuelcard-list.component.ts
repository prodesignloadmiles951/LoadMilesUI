import { MatDialog } from '@angular/material';
import { FuelcardFilters } from './../../model/fuelcard';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FuelcardService } from '../../services/fuelcard.service';
import { FuelcardComponent } from './fuelcard.component';

@Component({
    selector: 'app-fuelcard-list',
    templateUrl: './fuelcard-list.component.html',
    providers: [FuelcardService]
})
export class FuelcardListComponent implements OnInit {
    public pageFilters: FuelcardFilters;
    Fuelcardlistdata = new Array<FuelcardFilters>();
    submitted: boolean;
    fuelcarddata: [];
    data: any;
    Isusersloading: boolean;
    SearchText: any;

    constructor(
        private router: Router,
        private _fuelcardService: FuelcardService,
        public dialog: MatDialog) { }

    ngOnInit(): void {
        this.Isusersloading = false;
        this.pageFilters = new FuelcardFilters();
        this.getData();
    }

    viewData(fuelcard) {
      var fuelcardObj=fuelcard;
      console.log(fuelcard, "fuelcard");
      fuelcardObj['EditMode']=true;
      console.log(fuelcardObj);
      let dialogConfig = Object.assign({ width: "1000px" },{ data: fuelcardObj });
      let viewDialogRef = this.dialog.open(FuelcardComponent, dialogConfig);
      viewDialogRef.afterClosed().subscribe((data) => {
        console.log(data);
      })
  }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(FuelcardComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()
          }
        })
      }
      getData() {
        this._fuelcardService.getFuelcardData().subscribe(data => {
          this.fuelcarddata = data;
        });
    }
}

