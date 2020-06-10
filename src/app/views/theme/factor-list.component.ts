import { Component, OnInit} from '@angular/core';
import { FactorFilters } from '../../model/factor';
import { Router } from '@angular/router';

@Component({
    selector: 'app-factor-list',
    templateUrl: './factor-list.component.html',
    providers: []
})
export class FactorlistComponent implements OnInit {
    public pageFilters: FactorFilters;
    Factorlistdata = new Array<FactorFilters>();
    submitted: boolean;

    constructor(
        private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new FactorFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/factor');
      }
}
