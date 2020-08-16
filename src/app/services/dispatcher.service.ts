import { DispatcherFilters } from './../model/dispatcher';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class DispatcherService {

    dispatchersurl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.dispatchersurl = environment.dispatchersurl;
    }

    SendForm(pageFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.dispatchersurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getDispatcherData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.dispatchersurl,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    
    EditDispatcher(obj) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.put(this.dispatchersurl+"/"+obj._id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    DeleteDispatcher(_id) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.delete(this.dispatchersurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
}
