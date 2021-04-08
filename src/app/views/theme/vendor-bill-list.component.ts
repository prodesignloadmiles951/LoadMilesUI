import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { VendorBillsFilter } from '../../model/vendorBill';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VendorBillComponent } from './vendor-bill.component';
import { VendorBillService } from '../../services/vendorBills.service';
import { VendorService } from "../../services/vendor.service";
import { from, of } from 'rxjs';

@Component({
  selector: 'app-vendor-bill-list',
  templateUrl: './vendor-bill-list.component.html',
  providers: [VendorBillService, VendorService]
})
export class VendorBillListComponent implements OnInit {
  public vendorBills: VendorBillsFilter[] = [];
  vendorBillsConstant: VendorBillsFilter[] = [];
  SearchText: string;
  queryVendorId: string;
  queryVendor: any[];
  queryFromDate: Date;
  queryToDate: Date;

  constructor(
    private router: Router,
    private _toaster: ToastrService,
    private vendorBillService: VendorBillService,
    private vendorService: VendorService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.queryVendorId = "All";
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
      this.vendorBills = data;
      this.vendorBillsConstant = data;
    })

    this.vendorService.getVendorData().subscribe(data => {
      this.queryVendor = data.result;
    })
  }

  onSubmit() {
    // this.vendorBills = this.vendorBills.filter(vendor => {
    //   return vendor.displayName.toLowerCase().match(this.SearchText.toLowerCase());
    // })
  }

  clearSearch() {
    this.ngOnInit();
  }

  vendorSelect(event) {
    // console.log(this.queryFromDate);
    // if(this.queryVendorId != "All"){
    //   this.getData();
    //   this.vendorBills = this.vendorBills.filter(bill => {
    //     return bill.vendorId._id === this.queryVendorId;
    //   })
    // }
  }

  onSearch() {
    if (typeof this.queryFromDate === 'undefined')
      this.queryFromDate = new Date('1000-01-01');

    if (typeof this.queryToDate === 'undefined')
      this.queryToDate = new Date('9999-01-01');

    this.vendorBills = this.vendorBillsConstant;

    if (this.queryVendorId != "All") {
      this.vendorBills = this.vendorBills.filter(bill => {
        return (bill.vendorId._id === this.queryVendorId
          && new Date(bill.billDate).getTime() >= new Date(this.queryFromDate).getTime()
          && new Date(bill.billDate).getTime() <= new Date(this.queryToDate).getTime());
      });
    } else {
      this.vendorBills = this.vendorBills.filter(bill => {
        return (new Date(bill.billDate).getTime() >= new Date(this.queryFromDate).getTime()
          && new Date(bill.billDate).getTime() <= new Date(this.queryToDate).getTime());
      });
    }
  }

  onDownload() {

  }

}
