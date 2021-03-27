import { VendorBillsFilter } from './../model/vendorBill';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class VendorBillService {

    vendorbillsurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.vendorbillsurl = environment.vendorbillsurl;
    }

    sendBill(vendorBill: VendorBillsFilter) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.vendorbillsurl, vendorBill, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    getVendorBillsData() {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.vendorbillsurl, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    getVendorBills(id: string) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.vendorbillsurl + '/' + id, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    editBill(vendorBill: VendorBillsFilter) {
        let option = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.vendorbillsurl, vendorBill, option).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

}
