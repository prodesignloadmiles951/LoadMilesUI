import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TrailersFilters } from '../../model/trailers';
import { TrailerService } from '../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    providers: [TrailerService, ToastrService, ]
})
export class TrailersComponent implements OnInit {
    pageFilters: TrailersFilters;
    Trailerslistdata = new Array<TrailersFilters>();
    model: any = {};
    submitted: boolean;

    onSubmit() {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
    }

    constructor(private _toaster: ToastrService, private trailersService: TrailerService) { }

    ngOnInit(): void {
        this.pageFilters = new TrailersFilters();
    }

    submit() {
            // this.trailersService.saveTrailers(this.pageFilters).subscribe(
            //     resp => {
            //         this.submitted = true;
            //         this._toaster.info("trailers Data Submitted","Success");
            //       },error=>{
            //         this.submitted = false;
            //         this._toaster.error("Submit Agian","Faild");
            //       });
            console.log(this.pageFilters);
    }
}
