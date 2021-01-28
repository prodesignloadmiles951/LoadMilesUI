import { FactorFilters } from './../model/factor';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class FactorService {

    factorurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.factorurl = environment.factorurl;
    }

    SendForm(pageFilters: FactorFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.factorurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getFactorData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.factorurl,options).pipe(map(response=>response.json().data ? [] : response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    EditFactor(obj) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.factorurl+"/"+obj._id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
        }
}
