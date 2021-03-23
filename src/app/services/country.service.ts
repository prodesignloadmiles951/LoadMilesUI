import { Currency } from './../model/currency';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()

export class CountryService {

    countryurl: string;
    stateurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.countryurl = environment.countryurl;
        this.stateurl = environment.stateurl;
    }

    // postCurrency(country: Country) {
    //     let options = new RequestOptions({ headers: this._headerService.getHeader() });
    //     return this.http.post(this.countryurl, currency, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    // }

    getCountries() {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.countryurl, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    getStates(countryId: string) {
        let newStateUrl = this.stateurl + '/' + countryId;
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(newStateUrl, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    // EditVendor(obj) {
    //     let options = new RequestOptions({ headers: this._headerService.getHeader() });
    //     return this.http.put(this.countryurl, obj, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    // }

    // DeleteVendor(_id) {
    // let options = new RequestOptions({ headers: this._headerService.getHeader() });
    // return this.http.delete(this.countryurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    // }
}