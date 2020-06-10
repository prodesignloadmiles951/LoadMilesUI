import { Component, OnInit} from '@angular/core';
import { VendorFilters } from '../../model/vendor';
import { Router } from '@angular/router';

@Component({
    selector: 'app-vendor-list',
    templateUrl: './vendor-list.component.html',
    providers: []
})
export class VendorlistComponent implements OnInit {
    public pageFilters: VendorFilters;
    VendorFilterslistdata = new Array<VendorFilters>();
    submitted: boolean;

    constructor(
        private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new VendorFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/vendor');
      }
}
