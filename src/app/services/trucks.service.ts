import { TrucksFilters } from './../model/trucks';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class TrucksService {

    trucksurl: string;
    uploadFileUrl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.trucksurl = environment.trucksurl;
        this.uploadFileUrl = environment.uploadUrl;
    }

    SendForm(pageFilters: TrucksFilters) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.trucksurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    getTrucksData() {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.trucksurl,options).pipe(map(response=>response.json().data ? [] : response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    EditTrucks(obj,id) {
        delete obj['_id']
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.trucksurl+"/"+id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }

    DeleteTrucks(_id) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.delete(this.trucksurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    uploadFile(file){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.uploadFileUrl,file,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
    downloadFile(){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.uploadFileUrl,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    }
}
