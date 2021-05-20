import { Component, OnInit, Inject } from "@angular/core";
import { SupportRequestService } from "../../../services/support-request-service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { _ } from 'lodash';
import { SupportRequest } from "../../../model/support-request";


@Component({
  selector: 'app-supportrequestform',
  templateUrl: './supportrequestform.component.html',
  styleUrls: ['./supportrequestform.component.scss'],
  providers: [SupportRequestService]
})
export class SupportrequestformComponent implements OnInit {
  supportRequest: SupportRequest = <SupportRequest>{};
  file: File;
  submitted: boolean = false;
  IsDataloading: boolean = false;
  constructor(
    private _toaster: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public retreivedData: any,
    private _supportRequestService: SupportRequestService
  ) { }

  ngOnInit() {
    this.IsDataloading = false;
    if (this.retreivedData) {
      this.supportRequest = this.retreivedData;
    } else {
      this.supportRequest = <SupportRequest>{};
    }
  }

  selectFile(event){
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
    }
  }

  submit(isFormInvalid) {
    this.IsDataloading = true;
    // if (isFormInvalid) {
    //   this._toaster.error("Please Enter All the Required Fields", "Failed");
    //   this.submitted = true;
    //   this.IsDataloading = false;
    //   return;
    // }
    var form = new FormData();
    form.append('title', this.supportRequest.title);
    form.append('responsePreference', this.supportRequest.responsePreference);
    form.append('details', this.supportRequest.details);
    form.append('category', this.supportRequest.category);
    form.append('file', this.file);
    console.log(form.get('title'));

    if (this.supportRequest && this.supportRequest["EditMode"]) {
      //console.log("edit ran");

      let formdata = JSON.parse(JSON.stringify(this.supportRequest));
      delete formdata["EditMode"];
      delete formdata['createdAt'];
      delete formdata['updatedAt'];
      this._supportRequestService.EditVendor(form).subscribe(
        (response) => {
          //console.log(response, "response");
          this._toaster.info("Data Submitted", "Success");
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(this.supportRequest);
          let resError = JSON.parse(error._body);

          this._toaster.error(resError.error.message, "Failed");
          this.IsDataloading = false;
        }
      )
    } else {
      //console.log(this.supportRequest);

      this._supportRequestService.SendForm(form).subscribe(
        (response) => {
          console.log(response);
          //console.log(response, "response");
          this._toaster.info("Data Submitted", "Success");
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
          let resError = JSON.parse(error._body);

          this._toaster.error(resError.error.message, "Failed");
          this.IsDataloading = false;
        }
      );
    }
  }

}
