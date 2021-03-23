import { VendorFilters } from "./../model/vendor";
import {
  Http,
  Response,
  Headers,
  Request,
  RequestOptions,
} from "@angular/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { AuthHeaderService } from "../views/authheader.service";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class SetupDataService {
  expensetypeurl: string;
  expensecategoryurl: string;
  bankurl: string;
  paymenttermurl: string;
  constructor(private http: Http, private _headerService: AuthHeaderService) {
    this.expensetypeurl = environment.expensetypeurl;
    this.expensecategoryurl = environment.expensecategoryurl;
    this.bankurl = environment.bankurl;
    this.paymenttermurl = environment.paymenttermurl;
  }

  getPaymentTerms() {
    let options = new RequestOptions({
      headers: this._headerService.getHeader(),
    });
    return this.http.get(this.paymenttermurl, options).pipe(
      map((response) => (response.json().data ? [] : response.json())),
      catchError((error: Response) => {
        return observableThrowError(error);
      })
    );
  }

  getBanks() {
    let options = new RequestOptions({
      headers: this._headerService.getHeader(),
    });
    return this.http.get(this.bankurl, options).pipe(
      map((response) => (response.json().data ? [] : response.json())),
      catchError((error: Response) => {
        return observableThrowError(error);
      })
    );
  }

  getExpenseData() {
    let options = new RequestOptions({
      headers: this._headerService.getHeader(),
    });
    return this.http.get(this.expensetypeurl, options).pipe(
      map((response) => (response.json().data ? [] : response.json())),
      catchError((error: Response) => {
        return observableThrowError(error);
      })
    );
  }

  updateExpenseType(obj) {
    let options = new RequestOptions({
      headers: this._headerService.getHeader(),
    });
    return this.http.put(this.expensetypeurl, obj, options).pipe(
      map(response => response.json()),
      catchError((error: Response) => {
        return observableThrowError(error);
      }));
  }

  getExpenseTypeData() {
    let options = new RequestOptions({
      headers: this._headerService.getHeader(),
    });
    return this.http.get(this.expensecategoryurl, options).pipe(
      map((response) => (response.json().data ? [] : response.json())),
      catchError((error: Response) => {
        return observableThrowError(error);
      })
    );
  }

  createExpense(expense: any) {
    let options = new RequestOptions({
      headers: this._headerService.getHeader(),
    });
    return this.http.post(this.expensetypeurl, expense, options).pipe(
      map((response) => response.json()),
      catchError((error: Response) => {
        return observableThrowError(error);
      })
    );
  }
}
