import { DispatcherFilters } from '../../model/dispatcher';
import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dispatcher',
    templateUrl: './dispatcher.component.html',
    providers: []
})
export class DispatcherComponent implements OnInit {
    public pageFilters: DispatcherFilters;
    Dispatcherlistdata = new Array<DispatcherFilters>();
    submitted: boolean;
    typeDetails=[];
    filename: any;

    ngOnInit(): void {
        this.pageFilters = new DispatcherFilters();
         this.typeDetails=[
      {
          "ID": 0,
          "Name": "% sales"
      },
      {
          "ID": 1,
          "Name": "Per Mile"
      },
      {
          "ID": 2,
          "Name": "Per Hour"
      }
    ]
    }
    showfiles(e){
      console.log(e.target.files)
      this.filename = e.target.files
    }

    submit() {
        console.log(this.pageFilters);
    }
}

