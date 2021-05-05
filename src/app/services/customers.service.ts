import { CustomersFilters } from './../model/customers';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map,catchError } from 'rxjs/operators'

@Injectable()

export class CustomersService {

    customersurl: string;
    constructor(private http: Http, private _headerService:AuthHeaderService){
        this.customersurl=environment.customersurl;
    }

    SendForm(pageFilters: CustomersFilters){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.customersurl,pageFilters,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }

      getCustomersData(){
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.customersurl,options).pipe(map(response=>response.json().data ? [] : response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
      
      EditCustomers(obj,id){
        delete obj['_id']
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.put(this.customersurl+"/"+id,obj,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }

      DeleteCustomers(_id) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.delete(this.customersurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
      }
}