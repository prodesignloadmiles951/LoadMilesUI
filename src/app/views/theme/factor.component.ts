import { FactorFilters } from './../../model/factor';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-factor',
    templateUrl: './factor.component.html',
    providers: []
})
export class FactorComponent implements OnInit {
    public pageFilters: FactorFilters;
    Factorlistdata = new Array<FactorFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new FactorFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

