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
export class PickupserviceService {

	pickupform: string;
    zipurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.pickupform = environment.pickupform;
        this.zipurl = environment.postalcodeUrl;

    }

    SendPickupForm(pickupdata) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.pickupform,pickupdata, options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getpickupData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.pickupform,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    EditPickup(obj) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.put(this.pickupform+"/"+obj._id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    DeletePickup(id) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.delete(this.pickupform+"/"+id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    getzipcodeData(id) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.zipurl+id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

}
