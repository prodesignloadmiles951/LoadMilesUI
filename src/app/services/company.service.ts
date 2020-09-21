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
    newcompanyurl: string;
    URL:string;
    roleurl: string;
    linkedcompanyurl: string;
    constructor(private http: Http, private _headerService:AuthHeaderService){
        this.companyurl=environment.companyurl;
        this.URL=environment.url;
        this.roleurl= environment.roledetailsUrl
        this.newcompanyurl=environment.newcompanyurl;
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
      onCreateRole(obj){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.URL+'userapi/user',obj,options)
        .pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
      getRoleData(){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.roleurl,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
      getcompanyRoleData(){
        let options = new RequestOptions();
        return this.http.get(this.roleurl,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
      newCompanyregister(pageFilters: CompanyFilters){
        let options = new RequestOptions();
        return this.http.post(this.newcompanyurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
      getcompanylistinfo(id){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.newcompanyurl+'/'+ id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
      getcompanyroleinfo(cmpid,userid){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.newcompanyurl+'/'+ cmpid + '/'+ userid,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
}