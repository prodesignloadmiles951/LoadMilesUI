import { DispatcherFilters } from '../../model/dispatcher';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dispatcher-list',
    templateUrl: './dispatcher-list.component.html',
    providers: []
})
export class DispatcherlistComponent implements OnInit {
    public pageFilters: DispatcherFilters;
    Dispatcherlistdata = new Array<DispatcherFilters>();
    submitted: boolean;

    constructor(
        private router: Router) { }

    ngOnInit(): void {
        this.pageFilters = new DispatcherFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/dispatcher');
      }
}

