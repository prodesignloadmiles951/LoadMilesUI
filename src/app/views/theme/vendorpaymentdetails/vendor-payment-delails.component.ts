import { Component, OnInit, Inject } from '@angular/core';
import { VendorPaymentService } from '../../../services/vendor-payment.service';
import { ToastrService } from "ngx-toastr";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { VendorPaymentComponent } from '../vendorpaymentform/vendor-payment.component';

@Component({
  selector: 'app-vendor-payment-delails',
  templateUrl: './vendor-payment-delails.component.html',
  providers: [VendorPaymentService]
})
export class VendorPaymentDelailsComponent implements OnInit {
  public vendorPayment: any;
  public balance: number;

  constructor(
    private _toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public retreivedData: any,
    public dialogRef: MatDialogRef<VendorPaymentDelailsComponent>,
    private vendorPaymentService: VendorPaymentService,
  ) { }

  ngOnInit() {
    this.balance = 0;
    if (this.retreivedData) {
      //console.log(this.retreivedData);
      this.vendorPayment = this.retreivedData;
      this.vendorPayment.paymentLine.forEach(payment => {
        this.balance += payment.billId.billAmount;
      });
      this.vendorPayment.balance = this.balance - this.vendorPayment.amount;
    }
  }

}
