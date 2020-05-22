import { DispatcherFilters } from '../../model/dispatcher';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dispatcher',
    templateUrl: './dispatcher.component.html',
    providers: []
})
export class DispatcherComponent implements OnInit {
    public pageFilters: DispatcherFilters;
    Careerlistdata = new Array<DispatcherFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new DispatcherFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

