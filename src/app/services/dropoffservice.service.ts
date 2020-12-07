import { DriverFilters } from './../model/driver';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropoffserviceService {

	dropoffform: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.dropoffform = environment.dropoffform;
    }

    SendDropoffform(dropoffdata) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.dropoffform,dropoffdata, options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getdroppoffData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.dropoffform,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    EditDropoff(obj) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.put(this.dropoffform+"/"+obj._id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    DeleteDropoff(data) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.delete(this.dropoffform + "/" + data._id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

}
