import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { VendorPaymentService } from '../../services/vendor-payment.service';
import { MatDialog } from '@angular/material';
import { VendorPaymentDelailsComponent } from './vendorpaymentdetails/vendor-payment-delails.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  providers: [VendorPaymentService]
})
export class PaymentListComponent implements OnInit {
  public payments: any[];

  constructor(
    private router: Router,
    private vendorPaymentService: VendorPaymentService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  details(payment) {
    let dialogConfig = Object.assign({ width: "1000px" }, { data: payment })
    let editDialogRef = this.dialog.open(VendorPaymentDelailsComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (data == null) { this.getData(); } else {
      }
    })
  }

  getData() {
    this.vendorPaymentService.getVendorPaymentData().subscribe(data => {
      this.payments = data;
      this.payments = _.orderBy(this.payments, p => Date.parse(p.paymentDate), 'desc');
      // console.log(data);
    })
  }

}
