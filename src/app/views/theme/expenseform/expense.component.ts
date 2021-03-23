import { Component, OnInit, Inject } from "@angular/core";
import { SetupDataService } from "../../../services/setupdata.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { _ } from 'lodash';


@Component({
  selector: "app-expense",
  templateUrl: "./expense.component.html",
  providers: [SetupDataService],
})
export class ExpenseComponent implements OnInit {
  pageFilters: any;
  expenseTypes: any;

  constructor(
    private _toaster: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public retreivedData: any,
    private setupDataService: SetupDataService
  ) { }

  ngOnInit() {
    if (this.retreivedData) {
      console.log(this.retreivedData);
      this.pageFilters = this.retreivedData;
      console.log("should not run");
    } else {
      this.pageFilters = <any>{};
      console.log("null ran");
    }
    this.getData();
  }

  getData() {
    this.setupDataService.getExpenseTypeData().subscribe((data) => {
      this.expenseTypes = data;
      if (this.pageFilters) {
        let expense = this.expenseTypes.find(expenseType => {
          if (expenseType.name == this.pageFilters.expenseCategory.name) {
            return expenseType;
          }
        })
        this.pageFilters.expenseCategoryId = expense._id;
      }
    });


  }

  submit() {
    if (this.pageFilters && this.pageFilters["EditMode"]) {
      console.log("edit ran");
      delete this.pageFilters["EditMode"];
      this.setupDataService.updateExpenseType(this.pageFilters).subscribe(
        (response) => {
          console.log(response, "response");
          this._toaster.info("Data Submitted", "Success");
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
          this._toaster.error("Please try aggain", "Error");
          this.pageFilters["EditMode"] = true;
        }
      )
    } else {
      console.log(this.pageFilters);

      this.setupDataService.createExpense(this.pageFilters).subscribe(
        (response) => {
          console.log(response, "response");
          this._toaster.info("Data Submitted", "Success");
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
          this._toaster.error("Please try aggain", "Error");
        }
      );
    }
  }
}
