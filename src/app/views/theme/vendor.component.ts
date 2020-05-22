import { VendorFilters } from '../../model/vendor';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    providers: []
})
export class VendorComponent implements OnInit {
    public pageFilters: VendorFilters;
    Vendorlistdata = new Array<VendorFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new VendorFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

