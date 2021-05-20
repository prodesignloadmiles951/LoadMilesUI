import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthenticationService } from '../views/authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthHeaderService { 
    constructor(
        private _authservice: AuthenticationService
        ) {
    }
    getHeader() {
        let header = new Headers();
        let LoginUser = this._authservice.getloginUser();
        let token = LoginUser != null ? LoginUser.result.token : '';
        header.append("Content-Type", 'application/json');
        header.append("Access-Control-Allow-Origin", "*");
        if (token) {
            header.append('Authorization', token);
            // header.append('Authorization', 'Bearer ' + token);
        }
        return header;
    }
    getContentType_Headers() {
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return headers;
    }
    getHttpHeaders() {
        let loginUser = this._authservice.getloginUser();
        let token = loginUser ? loginUser.access_token : null
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (token ? token : null)
            })
        };

        return httpOptions;
    }

    getMutipartHeader(){
        let header = new Headers();
        let LoginUser = this._authservice.getloginUser();
        let token = LoginUser != null ? LoginUser.result.token : '';
        header.append("Access-Control-Allow-Origin", "*");
        if (token) {
            header.append('Authorization', token);
            // header.append('Authorization', 'Bearer ' + token);
        }
        return header;
    }
}