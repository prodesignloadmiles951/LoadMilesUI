import { Component, OnInit } from '@angular/core';
import { SupportRequest } from '../../model/support-request';
import { SupportRequestService } from '../../services/support-request-service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {SupportrequestformComponent} from './supportrequestform/supportrequestform.component';

@Component({
  selector: 'app-support-request-list',
  templateUrl: './support-request-list.component.html',
  styleUrls: ['./support-request-list.component.scss'],
  providers: [SupportRequestService]
})
export class SupportRequestListComponent implements OnInit {
  supportRequests: SupportRequest[] = [];

  constructor( private router: Router,
    private _toaster: ToastrService,
    private _supportRequestService: SupportRequestService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this._supportRequestService.getSupportRequests().subscribe((data) => {
      this.supportRequests = data;
      console.log(data);
    })
  }

  Add(){
    let dialogConfig = Object.assign({ width: "1000px" }, { data: null })
    let editDialogRef = this.dialog.open(SupportrequestformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      if (data == null || typeof data == "undefined") { this.getData(); } else {
      }
    })
  }

  editData(supportRequest){
    supportRequest["EditMode"] = true;
    let dialogConfig = Object.assign({ width: "1000px" }, { data: supportRequest })
    let editDialogRef = this.dialog.open(SupportrequestformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      //console.log(data)
      if (data == null) { this.getData(); } else {
      }
    })
  }

}
