import { AccidentFilters } from '../../model/accident';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-accident',
    templateUrl: './accident.component.html',
    providers: []
})
export class AccidentComponent implements OnInit {
    public pageFilters: AccidentFilters;
    Accidentlistdata = new Array<AccidentFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new AccidentFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

