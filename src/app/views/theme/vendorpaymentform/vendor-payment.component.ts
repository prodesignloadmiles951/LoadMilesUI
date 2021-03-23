import { Component, OnInit } from "@angular/core";
import { SetupDataService } from "../../../services/setupdata.service";
import { VendorService } from "../../../services/vendor.service";
import { VendorBillService } from "../../../services/vendorBills.service";
import { VendorPaymentService } from '../../../services/vendor-payment.service';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-vendor-payment',
  templateUrl: './vendor-payment.component.html',
  providers: [SetupDataService, VendorService, VendorBillService, VendorPaymentService]
})
export class VendorPaymentComponent implements OnInit {
  pageFilters: any = [];
  vendorBills: any[] = [];
  vendors: any[] = [];
  paidBills: any[] = [];

  constructor(private setupDataService: SetupDataService,
    private vendorService: VendorService,
    private vendorBillService: VendorBillService,
    private vendorPaymentService: VendorPaymentService,
    private _toasterService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.pageFilters.amount = 0;
    this.vendorService.getVendorData().subscribe((data) => {
      this.vendors = data.result;
      console.log(data.result);
    });
  }

  submit() {
    console.log(this.pageFilters);
    console.log(this.paidBills, 'Paid Bills');
    let payments = this.paidBills.map(bill => {
      let payment = {
        billId: bill._id,
        vendorId: this.pageFilters.vendorId,
        paymentDate: this.pageFilters.paymentDate,
        amount: bill.payment,
        paymentMethod: this.pageFilters.paymentMethod,
        paymentRef: this.pageFilters.paymentRef
      }
      return payment;
    });

    this.vendorPaymentService.SendForm(payments).subscribe(
      (data) => {
        console.log(data);
        this._toasterService.info("Data Submitted", "Success");
        this.router.navigateByUrl('/theme/payment-list');
      },
      (error) => {
        console.log(error);
        this._toasterService.error("Please Try Again", "Error");
      });
    console.log(payments);
  }

  reset() {

  }

  onExpenseEdit(event: any) {
    this.pageFilters.amount = this.pageFilters.amount + event.data.payment;
    var bill = this.paidBills.find(b => b._id == event.data._id);
    if (!bill) this.paidBills.push(event.data);
    else this.paidBills = this.paidBills.map(b => {
      if (b._id == event.data._id) {
        b.payment = event.data.payment;
      }
      return b;
    });

  }

  vendorSelect(event: any) {
    this.vendorBillService.getVendorBills(event.target.value).subscribe((data) => {
      this.vendorBills = data;
      console.log(data);
      this.updateBalance();
    })
  }

  updateBalance() {
    console.log(this.vendorBills);
    this.pageFilters.balance = 0;
    this.vendorBills.forEach(e => {
      this.pageFilters.balance = this.pageFilters.balance + (e.billAmount - e.paidAmount);
    });
  }

  calculateRemainingAmount(rowData) {
    return rowData.billAmount - rowData.paidAmount;
  }

  disableFieldsExceptPayment(event: any) {
    if (event.parentType === "dataRow" && event.dataField === "payment") {
      return;
    }
    else
      event.editorOptions.disabled = true;
  }

  focusOnPayment(event: any) {
    if (event.dataField === "payment") {
      setTimeout(() => {
        event.component.focus(event.editorElement);
      }, 100);
    }
  }

  disableFocus(event: any) {
    if (event.dataField !== "payment") {
      event.isHighlighted = false;
    }
  }

}
