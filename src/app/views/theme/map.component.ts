import { MapFilters } from './../../model/map';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    providers: []
})
export class MapComponent implements OnInit {
    public pageFilters: MapFilters;
    Maplistdata = new Array<MapFilters>();
    submitted: boolean;

    ngOnInit(): void {
        this.pageFilters = new MapFilters();
    }

    submit() {
        console.log(this.pageFilters);
    }
}

