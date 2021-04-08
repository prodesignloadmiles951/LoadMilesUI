import { VendorComponent } from './vendor.component';
import { VendorService } from '../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
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
  public constantPageFilters: VendorFilters[] = [];
  //Have to Implement
  SearchText: string;
  VendorFilterslistdata = new Array<VendorFilters>();
  submitted: boolean;
  vendordata: VendorFilters[] = [];
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
    //   //(this.retreivedData, "retreived data")
    // }
    this.pageFilters = new VendorFilters();
    this.getData();
  }

  editData(vendor) {
    var vendorObj = vendor;
    //(vendor, "vendor");
    vendorObj['EditMode'] = true;
    //(vendorObj);
    let dialogConfig = Object.assign({ width: "1024px" }, { data: vendorObj });
    let viewDialogRef = this.dialog.open(VendorComponent, dialogConfig);
    viewDialogRef.afterClosed().subscribe((data) => {
      //(data)
    })
  }

  viewData(vendor) {
    var vendorObj = vendor;
    //(vendor, "vendor");
    vendorObj['EditMode'] = true;
    //(vendorObj);
    let dialogConfig = Object.assign({ width: "1024px" }, { data: vendorObj });
    let viewDialogRef = this.dialog.open(VendorComponent, dialogConfig);
    viewDialogRef.afterClosed().subscribe((data) => {
      //(data)
    })
  }

  submit() {
    //(this.pageFilters);
  }
  Add() {
    let dialogConfig = Object.assign({ width: "1024px" }, { data: {} })
    let editDialogRef = this.dialog.open(VendorComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      //(data)
      if (data == null) { this.getData(); } else {

      }
    })
  }
  getData() {
    this._vendorService.getVendorData().subscribe(data => {
      //(data);
      this.vendordata = data.result;
      this.constantPageFilters = data.result;
    });
  }

  onSubmit() {   
    this.vendordata = this.constantPageFilters.filter(vendor => {
        return (vendor.displayName.toLowerCase().match(this.SearchText.toLowerCase())
                || vendor.ssn.match(this.SearchText)
                || vendor.phone === parseInt(this.SearchText));
    })
  }

  clearSearch() {
    this.ngOnInit();
  }
}
