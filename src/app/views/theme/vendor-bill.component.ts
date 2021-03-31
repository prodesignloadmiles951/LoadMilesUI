import { Component, OnInit, Inject } from "@angular/core";
import { SetupDataService } from "../../services/setupdata.service";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { VendorBillsFilter } from '../../model/vendorBill';
import { VendorBillService } from "../../services/vendorBills.service";
import { VendorService } from "../../services/vendor.service";

@Component({
  selector: 'app-vendor-bill',
  templateUrl: './vendor-bill.component.html',
  providers: [SetupDataService, VendorBillService, VendorService]
})
export class VendorBillComponent implements OnInit {
  pageFilters: VendorBillsFilter = <VendorBillsFilter>{};
  vendors: any[] = [];
  expenseDetails: any = {};
  IsDataloading: boolean = false;
  gridBoxValue: number[] = [2];
  constructor(
    private _toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public retreivedData: any,
    public dialogRef: MatDialogRef<VendorBillComponent>,
    private setupdataService: SetupDataService,
    private vendorBillService: VendorBillService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.pageFilters.paidAmount = 0;

    if (this.retreivedData) {
      this.pageFilters = this.retreivedData;
      //(this.vendors, "vendors");
      //("should not run")
    } else {
      this.pageFilters = <VendorBillsFilter>{};
      this.pageFilters.billLines = [];
      this.pageFilters.billAmount = 0;
      //("null ran");
    }

    this.vendorService.getVendorData().subscribe((data) => {
      this.vendors = data.result;
      if (this.retreivedData)
        this.pageFilters.vendorId = this.pageFilters.vendorId._id;
    })     
    
    this.setupdataService.getExpenseData().subscribe((data) => {
      //(data);
      this.setupExpense();
      this.expenseDetails = data;
    })

  }

  gridBox_displayExpr(item) {
    return item && item.code + " " + item.name;
  }

  setupExpense() {
    this.pageFilters.billLines.forEach(e => {
      e.expense = e.expense._id;
    });
  }

  findExpense(id: string) {
    ////("done");
    let expense = this.expenseDetails.find(x =>
      ////(x._id, id);
      x._id == id
    );
    ////(expense, "expense");
    return expense;
  }

  submit() {

    ////(this.pageFilters.billLines);
    let expenses = this.pageFilters.billLines;
    expenses.forEach(x => {
      x.expense = this.findExpense(x.expense)
      delete x.__KEY__;
    });
    ////(expenses);
    this.pageFilters.billLines = expenses;

    if (this.pageFilters && this.pageFilters["EditMode"]) {
      //(this.pageFilters, "submitted data");
      delete this.pageFilters["EditMode"];
      //this.pageFilters.vendorId = this.pageFilters.vendorId.name;
      this.vendorBillService.editBill(this.pageFilters).subscribe(
        (response) => {
          this._toaster.info("Vendor Data Submitted", "Success");
          this.dialogRef.close(null);
        },
        (error) => {
          this.pageFilters["EditMode"] = true;
          this._toaster.error("Please try again", "Failed");
        });
    }
    else {
      ////(details, "details");
      //("should run");
      //(this.pageFilters);
      this.pageFilters.paidAmount = 0;
      this.vendorBillService.sendBill(this.pageFilters).subscribe(
        (response) => {
          this._toaster.info("Vendor Data Submitted", "Success");
          this.dialogRef.close(null);
        },
        (error) => {
          //(error);
          this._toaster.error("Please try again", "Failed");
        });
    }
  }

  reset() { }

  onExpenseAdd(event: any) {
    //(event.key);
    //(this.pageFilters.billLines);
    //this.pageFilters.billAmount = (event.key.billAmount).toFixed(3);
    //this.pageFilters.billAmount += this.pageFilters.billLines  
    //this.pageFilters.billLines.billAmount = event.key.billAmount
  }

  onExpenseDelete() { }

  onExpenseEdit(event: any) {
    if (event.newData.billAmount) {
      this.pageFilters.billAmount = (this.pageFilters.billAmount - event.key.billAmount) + event.newData.billAmount;
    }
  }

  onSavedRow(event: any) {
    //(event);
    let eventAmount = event.data.billAmount;
    this.pageFilters.billAmount = this.pageFilters.billAmount + parseFloat(eventAmount.toFixed(3));
    this.pageFilters.billAmount = parseFloat(this.pageFilters.billAmount.toFixed(3));
  }

  formatDecimal() {
    this.pageFilters.paidAmount = parseFloat((this.pageFilters.paidAmount).toFixed(3));
  }

}
