import { VendorComponent } from './vendor.component';
import { VendorService } from './../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject} from '@angular/core';
import { VendorFilters } from '../../model/vendor';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-vendor-list',
    templateUrl: './vendor-list.component.html',
    providers: [VendorService]
})
export class VendorlistComponent implements OnInit {
    public pageFilters: VendorFilters;
    VendorFilterslistdata = new Array<VendorFilters>();
    submitted: boolean;
    vendordata: [];
    data: any;

    constructor(
      // public dialogRef: MatDialogRef < VendorlistComponent >,
      // @Inject(MAT_DIALOG_DATA) public retreivedData: any,
        private router: Router,
        private _toaster: ToastrService,
        private _vendorService: VendorService,
        public dialog: MatDialog) { }

    ngOnInit(): void {
      // if (this.retreivedData) {
      //   console.log(this.retreivedData, "retreived data")
      // }
        this.pageFilters = new VendorFilters();
        this.getData();
    }

    viewData(vendor) {
        var vendorObj=vendor;
        console.log(vendor, "vendor");
        vendorObj['EditMode']=true;
        console.log(vendorObj);
        let dialogConfig = Object.assign({ width: "1000px" },{ data: vendorObj });
        let viewDialogRef = this.dialog.open(VendorComponent, dialogConfig);
        viewDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
        })
    }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(VendorComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData()
          }
        })
      }
    getData() {
        this._vendorService.getVendorData().subscribe(data => {
          this.vendordata = data;
        });
    }
}
