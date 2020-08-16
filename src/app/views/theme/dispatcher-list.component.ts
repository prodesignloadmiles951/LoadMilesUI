import { DispatcherFilters } from '../../model/dispatcher';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DispatcherService } from '../../services/Dispatcher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dispatcher-list',
    templateUrl: './dispatcher-list.component.html',
    providers: [DispatcherService, ToastrService]
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
    showForm=false

    constructor(
        private router: Router, private _dispatcherService: DispatcherService,private _toaster: ToastrService) { }

    ngOnInit(): void {
        this.pageFilters = new DispatcherFilters();
        this.getDispatcherData();
    }

    getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.Dispatcherdata = data;
      console.log(this.Dispatcherdata)
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
    this.showForm=true
}

viewData(dispatcher) {
    this.EditMode = false;
    var dispatcherObj=dispatcher
    dispatcherObj['EditMode']=this.EditMode
    this.dispatcherData=dispatcherObj
    this.dispatchers = new DispatcherFilters();
    this.dispatchers = dispatcher;
    this.selectedDispatcher = dispatcher.companyname;
    this.showForm=true
}

hidePopup(){
      this.showForm=false
    }

editDispatcher(dispatcher,selectedDispatcher) {
    this._dispatcherService.EditDispatcher(dispatcher).subscribe(response => {
          this._toaster.success(selectedDispatcher+ " dispatcher successfully updated", "Success");
        }, error => {
           this._toaster.error("error", "Try Again");
          });
          this.EditMode = false;
}

    submit() {
        console.log(this.pageFilters);
    }
    Add() {
        this.router.navigateByUrl('/theme/dispatcher');
      }
}

