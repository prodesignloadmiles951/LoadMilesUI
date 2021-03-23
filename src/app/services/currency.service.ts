import { Currency } from './../model/currency';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class CurrencyService {

    currencyurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.currencyurl = environment.currencyurl;
    }

    postCurrency(currency: Currency) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.currencyurl, currency, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    getCurrencies() {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.currencyurl, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    // EditVendor(obj) {
    //     let options = new RequestOptions({ headers: this._headerService.getHeader() });
    //     return this.http.put(this.currencyurl, obj, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    // }

    // DeleteVendor(_id) {
    // let options = new RequestOptions({ headers: this._headerService.getHeader() });
    // return this.http.delete(this.currencyurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    // }
}
