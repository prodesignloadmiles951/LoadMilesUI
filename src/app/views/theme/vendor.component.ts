import { VendorFilters, Account, Person } from "../../model/vendor";
import { Component, OnInit, Inject } from "@angular/core";
import { VendorService } from "../../services/vendor.service";
import { CurrencyService } from '../../services/currency.service';
import { CountryService } from '../../services/country.service';
import { SetupDataService } from '../../services/setupdata.service';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "app-vendor",
    templateUrl: "./vendor.component.html",
    providers: [VendorService, ToastrService, CurrencyService, CountryService, SetupDataService],
})
export class VendorComponent implements OnInit {
    public pageFilters: VendorFilters;
    submitted: boolean;
    IsDataloading: boolean;
    currencies: any[];
    countries: any[];
    states: any[];
    banks: any[];
    paymentTerms: any[];
    //router: Router;
    vendordata: [];

    constructor(
        private _toaster: ToastrService,
        public dialogRef: MatDialogRef<VendorComponent>,
        @Inject(MAT_DIALOG_DATA) public retreivedData: any,
        private _vendorService: VendorService,
        private _currencyService: CurrencyService,
        private _countryService: CountryService,
        private _setupDataSetvice: SetupDataService,
        private router: Router
    ) {  }

    ngOnInit(): void {
        if (this.retreivedData && this.retreivedData["EditMode"]) {
            //console.log(this.retreivedData, "retreived data");
            this.pageFilters = this.retreivedData;
        } else {
            //console.log("ran");
            this.pageFilters = new VendorFilters();
            this.pageFilters.account = new Account();
        }
        this.getData();
    }

    submit() {
        //console.log(this.pageFilters);
        this.submitted = true;
        if (this.pageFilters && this.pageFilters["EditMode"]) {
            delete this.pageFilters["EditMode"];
            this.IsDataloading = true;
            this._vendorService.EditVendor(this.pageFilters).subscribe(
                (response) => {
                    this.IsDataloading = false;
                    //this.submitted = true;
                    this._toaster.info("Vendor Data Submitted", "Success");
                    // this.router.navigateByUrl("theme/vendor-list");
                    this.dialogRef.close(null);
                },
                (error) => {
                    this.pageFilters["EditMode"] = true;
                    //this.submitted = false;
                    this._toaster.error("Submit Again", "Failed");
                }
            );
        } else {
            this.IsDataloading = true;
            this.pageFilters['companyId'] = localStorage.selectedCompany;
            this._vendorService.SendForm(this.pageFilters).subscribe(
                (response) => {
                    this.IsDataloading = false;
                    //this.submitted = true;
                    this._toaster.info("Vendor Data Submitted", "Success");
                    this.dialogRef.close(null);
                    //this.router.navigateByUrl("theme/vendor-list");
                },
                (error) => {
                    //this.submitted = false;
                    this._toaster.error("Submit Again", "Failed");
                }
            );
            this.getData();
        }
    }

    reset() {
        this.pageFilters = <VendorFilters>{};
    }

    getData() {
        this._vendorService.getVendorData().subscribe((data) => {
            this.vendordata = data;
        });
        this._currencyService.getCurrencies().subscribe((data) => {
            this.currencies = data;
        })
        this._countryService.getCountries().subscribe((data) => {
            this.countries = data;
        })

        this._setupDataSetvice.getBanks().subscribe((data) => {
            this.banks = data;
        })

        this._setupDataSetvice.getPaymentTerms().subscribe((data) => {
            this.paymentTerms = data;
        })
    }

    onCountrySelect(event: any) {
        let id = event.target.value;
        this._countryService.getStates(id).subscribe((data) => {
            this.states = data;
        });
    }
}
