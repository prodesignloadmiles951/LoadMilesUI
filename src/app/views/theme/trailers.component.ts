import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    providers: []
})
export class TrailersComponent implements OnInit {
    trailersForm = new FormGroup({

    });
    ngOnInit() {
    }

}
