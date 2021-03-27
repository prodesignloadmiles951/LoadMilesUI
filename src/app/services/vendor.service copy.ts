import { VendorFilters } from './../model/vendor';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class VendorService {

    vendorurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.vendorurl = environment.vendorurl;
    }

    SendForm(vendor: VendorFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.vendorurl, vendor, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    getVendorData() {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.vendorurl, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    EditVendor(obj) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.vendorurl, obj, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    // DeleteVendor(_id) {
    // let options = new RequestOptions({ headers: this._headerService.getHeader() });
    // return this.http.delete(this.vendorurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    // }
}
