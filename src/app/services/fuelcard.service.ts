import { FuelcardFilters } from './../model/fuelcard';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class FuelcardService {

    fuelCardurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.fuelCardurl = environment.fuelCardurl;
    }

    SendForm(pageFilters: FuelcardFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.fuelCardurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getFuelcardData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.fuelCardurl,options).pipe(map(response=>response.json().data ? [] : response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    EditVendor(obj) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.fuelCardurl + "/" + obj._id, obj, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

}
