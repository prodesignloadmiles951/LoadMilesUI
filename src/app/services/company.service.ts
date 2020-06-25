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

    SendForm(pageFilters: CompanyFilters){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.companyurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }

      getCompanyData(){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.companyurl,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
      
      EditCompany(obj){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.companyurl+"/"+obj._id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }

      DeleteCompany(_id) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.delete(this.companyurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
}