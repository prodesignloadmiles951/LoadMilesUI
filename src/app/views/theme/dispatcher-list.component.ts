import { DispatcherFilters } from '../../model/dispatcher';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DispatcherService } from '../../services/Dispatcher.service';

@Component({
    selector: 'app-dispatcher-list',
    templateUrl: './dispatcher-list.component.html',
    providers: [DispatcherService]
})
export class DispatcherlistComponent implements OnInit {
    public pageFilters: DispatcherFilters;
    public dispatchers: DispatcherFilters;
    Dispatcherlistdata = new Array<DispatcherFilters>();
    submitted: boolean;
    Dispatcherdata = [];
    EditMode: boolean;
    selectedDispatcher: any;
    dispatcherData={}

    constructor(
        private router: Router, private _dispatcherService: DispatcherService,) { }

    ngOnInit(): void {
        this.pageFilters = new DispatcherFilters();
        this.getDispatcherData();
    }

    getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.Dispatcherdata = data;
    });
  }

  editData(dispatcher) {
    this.EditMode = true;
    var dispatcherObj=dispatcher
    dispatcherObj['EditMode']=this.EditMode
    this.dispatcherData=dispatcherObj
    this.dispatchers = new DispatcherFilters();
    this.dispatchers = dispatcher;
    this.selectedDispatcher = dispatcher.firstname;

}

viewData(dispatcher) {
    this.EditMode = false;
    var dispatcherObj=dispatcher
    dispatcherObj['EditMode']=this.EditMode
    this.dispatcherData=dispatcherObj
    this.dispatchers = new DispatcherFilters();
    this.dispatchers = dispatcher;
    this.selectedDispatcher = dispatcher.companyname;
}

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/dispatcher');
      }
}

