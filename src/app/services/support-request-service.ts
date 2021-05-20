import { SupportRequest } from './../model/support-request';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class SupportRequestService {

    supportRequestUrl : string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.supportRequestUrl = environment.supportrequesturl;
    }

    SendForm(obj) {
        let options = new RequestOptions({ headers: this._headerService.getMutipartHeader() });
        console.log(obj);
        return this.http.post(this.supportRequestUrl, obj, options);
    }

    getSupportRequests() {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.supportRequestUrl, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    EditVendor(obj) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.supportRequestUrl, obj, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    // DeleteVendor(_id) {
    // let options = new RequestOptions({ headers: this._headerService.getHeader() });
    // return this.http.delete(this.vendorurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    // }
}
