import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { SetupDataService } from '../../services/setupdata.service';
import { Router } from '@angular/router';
import { ExpenseComponent } from './expenseform/expense.component';
import * as _ from 'lodash';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  providers: [SetupDataService]
})
export class ExpenseListComponent implements OnInit {
  public expenses: any[];

  constructor(private router: Router,
    private _toaster: ToastrService,
    private setupDataService: SetupDataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.setupDataService.getExpenseData().subscribe((data) => {
      this.expenses = data;
      this.expenses = _.orderBy(this.expenses, e => parseInt(e.code));
    })
  }

  Add() {
    let dialogConfig = Object.assign({ width: "1000px" }, { data: null })
    let editDialogRef = this.dialog.open(ExpenseComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (data == null) { this.getData(); } else {
      }
    })
  }

  viewData(expense) {
    expense["EditMode"] = true;
    let dialogConfig = Object.assign({ width: "1000px" }, { data: expense })
    let editDialogRef = this.dialog.open(ExpenseComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (data == null) { this.getData(); } else {
      }
    })
  }

  editData() { }

}
