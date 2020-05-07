import {throwError as observableThrowError ,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { map,catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthHeaderService } from '../authheader.service';
import { environment } from '../../../environments/environment';

@Injectable()

export class LoginService{
    public url:string;
constructor(private http:Http,
    private _headerService:AuthHeaderService  ){
        this.url=environment.loginurl;
}
Login(userName:string,password:string,usertype:string){
    let options = new RequestOptions({ headers: this._headerService.getHeader() });
    return this.http.get(this.url,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
}
}