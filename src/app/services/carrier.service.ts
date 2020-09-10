import { CarrierFilters } from './../model/carrier';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class CarrierService {

    carrierurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.carrierurl = environment.carrierurl;
    }

    SendForm(pageFilters: CarrierFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.carrierurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getCarrierData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.carrierurl+'?companyid='+localStorage.selectedCompany,options).pipe(map(response=>response.json().data ? [] : response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    
    EditCarrier(obj) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.put(this.carrierurl+"/"+obj._id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    DeleteCarrier(_id) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.delete(this.carrierurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
}
