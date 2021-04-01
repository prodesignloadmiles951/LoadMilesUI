import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { VendorFilters } from '../../model/vendor';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VendorBillComponent } from './vendor-bill.component';
import { VendorBillService } from '../../services/vendorBills.service';

@Component({
  selector: 'app-vendor-bill-list',
  templateUrl: './vendor-bill-list.component.html',
  providers: [VendorBillService]
})
export class VendorBillListComponent implements OnInit {
  public vendorBills: any[];

  constructor(
    private router: Router,
    private _toaster: ToastrService,
    private vendorBillService: VendorBillService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  editData(bill) {
    var vendorObj = bill;
    //console.log(bill, "vendor");
    vendorObj['EditMode'] = true;
    //console.log(vendorObj);
    let dialogConfig = Object.assign({ width: "1000px" }, { data: vendorObj });
    let viewDialogRef = this.dialog.open(VendorBillComponent, dialogConfig);
    viewDialogRef.afterClosed().subscribe((data) => {
      //console.log(data);
      this.getData();
    })
  }

  viewData(bill) {
    var vendorObj = bill;
    //console.log(bill, "vendor");
    vendorObj['EditMode'] = true;
    //console.log(vendorObj);
    let dialogConfig = Object.assign({ width: "1000px" }, { data: vendorObj });
    let viewDialogRef = this.dialog.open(VendorBillComponent, dialogConfig);
    viewDialogRef.afterClosed().subscribe((data) => {
      //console.log(data);
      this.getData();
    })
  }


  Add() {
    let dialogConfig = Object.assign({ width: "1000px" }, { data: null })
    let editDialogRef = this.dialog.open(VendorBillComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      if (data == null || typeof data == "undefined") { this.getData(); } else {

      }
    })
  }

  getData() {
    this.vendorBillService.getVendorBillsData().subscribe((data) => {
      //console.log(data);
      this.vendorBills = data;
    })
  }

}
