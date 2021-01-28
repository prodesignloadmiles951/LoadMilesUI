import { VendorFilters } from '../../model/vendor';
import { Component, OnInit, Inject} from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    providers: [VendorService, ToastrService]
})
export class VendorComponent implements OnInit {
    public pageFilters: VendorFilters;
    Vendorlistdata = new Array<VendorFilters>();
    submitted: boolean;
    router: any;
    vendordata: [];

    constructor(private _toaster: ToastrService,
        public dialogRef: MatDialogRef< VendorComponent >,
      @Inject(MAT_DIALOG_DATA) public retreivedData: any,
        private _vendorService: VendorService){
        }

    ngOnInit(): void {
        if (this.retreivedData) {
            console.log(this.retreivedData, "retreived data")
            this.pageFilters = this.retreivedData;
        } else {
            this.pageFilters = new VendorFilters();
           
        }
        this.getData();
       

    }

    submit() {
        console.log(this.pageFilters);
        this._vendorService.SendForm(this.pageFilters).subscribe(response => {
            this.submitted = true;
            this._toaster.info("Vendor Data Submitted","Success");
            this.router.navigateByUrl("theme/vendor-list");
          },error=>{
            this.submitted=false;
            this._toaster.error("Submit Again","Failed");
          });
          this.getData();
       }
    getData() {
        this._vendorService.getVendorData().subscribe(data => {
          this.vendordata = data;
        });
    }
}

