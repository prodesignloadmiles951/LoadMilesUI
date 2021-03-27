import { DispatcherFilters } from '../../model/dispatcher';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DispatcherService } from '../../services/dispatcher.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DispatcherformComponent } from './dispatcherform/dispatcherform.component'

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
        private router: Router, private _dispatcherService: DispatcherService,
        private _toaster: ToastrService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.pageFilters = new DispatcherFilters();
        this.getDispatcherData();
    }

    getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.Dispatcherdata = data.result;
      console.log(this.Dispatcherdata)
    });
  }

  editData(dispatcher) {
    var dispatcherObj=dispatcher
    dispatcherObj['EditMode']=true
    let dialogConfig = Object.assign({ width: "1000px" },{ data: dispatcherObj })
    let editDialogRef = this.dialog.open(DispatcherformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if(data == null){}else{
        this.getDispatcherData()        
      }
    })
}

viewData(dispatcher) {
    var dispatcherObj=dispatcher
    dispatcherObj['EditMode']=false
    let dialogConfig = Object.assign({ width: "1000px" },{ data: dispatcherObj })
    let viewDialogRef = this.dialog.open(DispatcherformComponent, dialogConfig);
    viewDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
    })
}
deleteData(dispatcher){
    this._dispatcherService.DeleteDispatcher(dispatcher['_id']).subscribe(response => {
      this._toaster.success("Dispatcher data deleted successfully", "Success", {timeOut: 3000,});
      this.getDispatcherData() 
    },error => {
      this._toaster.error("error", "Try Again", {timeOut: 2000,});
    })
}

hidePopup(){
      this.showForm=false
    }

editDispatcher(dispatcher,selectedDispatcher) {
    if(localStorage.selectedCompany == undefined){
           this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
       }else{
            dispatcher['companyid']=localStorage.selectedCompany
            this._dispatcherService.EditDispatcher(dispatcher,dispatcher['id']).subscribe(response => {
                  this._toaster.success(selectedDispatcher+ " dispatcher successfully updated", "Success", {timeOut: 3000,});
                }, error => {
               this._toaster.error("error", "Try Again", {timeOut: 2000,});
              });
              this.EditMode = false;
       }
}

// deleteDispatcher(dispatcher) {
//         if(localStorage.selectedCompany == undefined){
//            this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
//          }else{
//             this._dispatcherService.DeleteDispatcher(dispatcher._id).subscribe(data => {
//             this._toaster.info("Dispatcher Data Deleted", "Success", {timeOut: 3000,});
//             this.getDispatcherData();
//             });
//          }
//     }
   
    Add() {
        let dialogConfig = Object.assign({ width: "1000px" },{ data: {} })
        let editDialogRef = this.dialog.open(DispatcherformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getDispatcherData()        
          }
        })
      }
}

