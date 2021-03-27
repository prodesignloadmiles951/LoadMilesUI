import { DriverFilters } from './../model/driver';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class DriversService {

    driversurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.driversurl = environment.driversurl;
    }

    SendForm(pageFilters: DriverFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.driversurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getDriversData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.driversurl,options).pipe(map(response=>response.json().data ? [] : response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    
    EditDrivers(obj,id) {
    delete obj['_id']
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.put(this.driversurl+"/"+id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    DeleteDrivers(_id) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.delete(this.driversurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
}
