import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError , Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map,catchError } from 'rxjs/operators'
import { AuthHeaderService } from '../views/authheader.service';

@Injectable({
  providedIn: 'root'
})
export class CreateloadService {

  getloadsurl: string;
  constructor(private http: Http, private _headerService:AuthHeaderService){
      this.getloadsurl=environment.getloadsurl;
  }

  addLoadData(load){
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.post(this.getloadsurl,load,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
  }

  getLoadData(){
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.getloadsurl,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
  }
  editLoadData(data){
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.put(this.getloadsurl+'/'+data._id,data,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
  }
  deleteLoadData(data){
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.delete(this.getloadsurl+'/'+data._id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
  }

}
