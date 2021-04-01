import { TrailersFilters } from './../model/trailers';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class TrailerService {
    trailersurl: string;
    uploadurl: string;

    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.trailersurl = environment.trailersurl;
        this.uploadurl = environment.uploadUrl;
    }

    SendForm(pageFilters: TrailersFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.trailersurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getTrailersData() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.trailersurl,options).pipe(map(response=>response.json().data ? [] : response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    
    EditTrailers(obj,id) {
    delete obj['_id']
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.put(this.trailersurl+"/"+id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    DeleteTrailers(_id) {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.delete(this.trailersurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    getFileList() {
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.uploadurl,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
}
