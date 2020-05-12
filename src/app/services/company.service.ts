import { CompanyFilters } from './../model/companydetails';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map,catchError } from 'rxjs/operators'

@Injectable()

export class CompanyService {
   
    companyurl: string;
    constructor(private http: Http, private _headerService:AuthHeaderService){
        this.companyurl=environment.companyurl;
    }

    SendForm(filters: CompanyFilters){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.companyurl,{filters},options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
}