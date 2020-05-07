import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-trucks',
    templateUrl: './trucks.component.html',
    providers: []
})
export class TrucksComponent implements OnInit {
    trucksForm = new FormGroup({
        //make = new FormControl('');
    });
    ngOnInit() {
    }

}
